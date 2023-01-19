from flask import jsonify

# Importing standard Qiskit libraries and configuring account
from qiskit import QuantumCircuit, execute, Aer, IBMQ
from qiskit.compiler import transpile, assemble
from qiskit.tools.jupyter import *
from qiskit.visualization import *
from qiskit.providers.aer import noise
from qiskit_aer.noise import NoiseModel

# -*- coding: utf-8 -*-
# initialization
import numpy as np

# importing Qiskit
from qiskit import IBMQ, BasicAer
# from qiskit.providers.ibmq import least_busy
from qiskit.providers.ibmq import *
from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister, execute

from collections import defaultdict
import json

def wave_parse():
    # Loading your IBM Q account(s)
    IBMQ.save_account('0ebf515971d26d25134acac3a0d10e36ddf8713377db17e66733b704c73b29b4fbe4fdaf0b55f51afd7e452956a0d4cae700dc5d0c9c286fd33a3dda610971dd', overwrite=True)

    n = 7 # number of qubits used to represent s

    def wordToBV(s) :
        #convert text to binary
        a_byte_array = bytearray(s, "utf8")
        byte_list = []


        for byte in a_byte_array:
            binary_representation = bin(byte)
            byte_list.append(binary_representation[9-n:])
            #chop off the "0b" at the beginning. can also truncate the binary to fit on a device with N qubits
            #binary has 2 extra digits for "0b", so it starts at 9 for our 7 bit operation. 

        print(byte_list)
        
        circuit_array = []
        
        length = len(byte_list) 
        
        for i in range(length):
        
            s = byte_list[i]


            #do all  this stuff for every letter

            # We need a circuit with n qubits, plus one ancilla qubit
            # Also need n classical bits to write the output to
            bv_circuit = QuantumCircuit(n+1, n)

            # put ancilla in state |->
            bv_circuit.h(n)
            bv_circuit.z(n)

            # Apply Hadamard gates before querying the oracle
            for i in range(n):
                bv_circuit.h(i)

            # Apply barrier 
            bv_circuit.barrier()

            # Apply the inner-product oracle
            s = s[::-1] # reverse s to fit qiskit's qubit ordering
            for q in range(n):
                if s[q] == '0':
                    bv_circuit.i(q)
                else:
                    bv_circuit.cx(q, n)

            # Apply barrier 
            bv_circuit.barrier()

            #Apply Hadamard gates after querying the oracle
            for i in range(n):
                bv_circuit.h(i)

            # Measurement
            for i in range(n):
                bv_circuit.measure(i, i)
                
            circuit_array.append(bv_circuit)

        
        return circuit_array

    circuit_to_run = wordToBV('Toronto')

    #run on real hardware. 

    IBMQ.load_account()
    provider = IBMQ.get_provider(hub = 'ibm-q')

    #choose any device 8 qubits or more
    # device = least_busy(provider.backends(filters=lambda x: x.configuration().n_qubits >= 8 and 
    #                                   not x.configuration().simulator and x.status().operational==True))
        
    # print("Running on current least busy device: ", device)

    # or, specifically choose a device. Paris performs the best out of any device so far
    device = provider.get_backend('ibm_oslo')
    print("hardcoded to run on ", device)

    # Get the noise from quantic
    noise_model = NoiseModel.from_backend(device)
    # Get coupling map from backend
    # coupling_map = device.configuration().coupling_map
    # Get basis gates from noise model
    basis_gates = noise_model.basis_gates


    # Run our circuit on a quantum computer simulator, using the pre. Monitor the execution of the job in the queue
    from qiskit.tools.monitor import job_monitor
    job = execute(circuit_to_run, Aer.get_backend('qasm_simulator'),
                    # coupling_map=coupling_map,
                    basis_gates=basis_gates,
                    noise_model=noise_model,
                    shots=1024)
    job_monitor(job, interval = 2)

    # Get the results from the computation
    results = job.result()

    answer = results.get_counts()

    word = defaultdict(int)
    for letter in answer:
        for key in letter:
            word[key] += letter[key]

    categories = []
    data = []
    for key in word:
        categories.append(key)
        data.append(word[key])

    dictionary = {
        "categories": categories,
        "data": data
    }

    json_object = json.dumps(dictionary, indent=4)

    # with open('word.json', 'w', encoding='UTF8') as file:
    #     file.write(json_object)

    return jsonify(json_object)