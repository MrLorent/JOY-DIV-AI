# UTILS
from qiskit import QuantumCircuit

def word_to_BV(word, nb_qubits) :
        #convert text to binary
        a_byte_array = bytearray(word, "utf8")
        byte_list = []


        for byte in a_byte_array:
            binary_representation = bin(byte)
            byte_list.append(binary_representation[9-nb_qubits:])
            #chop off the "0b" at the beginning. can also truncate the binary to fit on a device with N qubits
            #binary has 2 extra digits for "0b", so it starts at 9 for our 7 bit operation. 

        print(byte_list)
        
        circuit_array = []
        
        length = len(byte_list) 
        
        for i in range(length):
        
            word = byte_list[i]


            #do all  this stuff for every letter

            # We need a circuit with n qubits, plus one ancilla qubit
            # Also need n classical bits to write the output to
            bv_circuit = QuantumCircuit(nb_qubits+1, nb_qubits)

            # put ancilla in state |->
            bv_circuit.h(nb_qubits)
            bv_circuit.z(nb_qubits)

            # Apply Hadamard gates before querying the oracle
            for i in range(nb_qubits):
                bv_circuit.h(i)

            # Apply barrier 
            bv_circuit.barrier()

            # Apply the inner-product oracle
            word = word[::-1] # reverse word to fit qiskit's qubit ordering
            for q in range(nb_qubits):
                if word[q] == '0':
                    bv_circuit.i(q)
                else:
                    bv_circuit.cx(q, nb_qubits)

            # Apply barrier 
            bv_circuit.barrier()

            #Apply Hadamard gates after querying the oracle
            for i in range(nb_qubits):
                bv_circuit.h(i)

            # Measurement
            for i in range(nb_qubits):
                bv_circuit.measure(i, i)
                
            circuit_array.append(bv_circuit)

        
        return circuit_array