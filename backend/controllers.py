# CONTROLLERS
from flask import jsonify

# Importing standard Qiskit libraries and configuring account
from qiskit import execute, Aer
from qiskit_aer.noise import NoiseModel
from qiskit.providers.ibmq import *
from qiskit.tools.monitor import job_monitor

from collections import defaultdict
import json

# CONSTANTS IMPORTS
from constants import NB_QUBITS

# MODELS IMPORT
from models import connexion

# UTILS IMPORT
from utils import word_to_BV

def wave_parse():
    backend = connexion()
    # Get the noise from quantic
    noise_model = NoiseModel.from_backend(backend)
    basis_gates = noise_model.basis_gates

    circuit_to_run = word_to_BV('Toronto', NB_QUBITS)

    # Run our circuit on a quantum computer simulator, using the pre. Monitor the execution of the job in the queue
    job =   execute(
                circuit_to_run,
                Aer.get_backend('qasm_simulator'),
                basis_gates=basis_gates,
                noise_model=noise_model,
                shots=1024
            )
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

    return jsonify(json_object)