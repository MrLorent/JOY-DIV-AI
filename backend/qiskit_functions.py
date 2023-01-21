# QUISKIT FUNCTION
from qiskit import QuantumCircuit

def prepare_quantum_circuit(byte_list, nb_qubits):
    circuits = []
    
    for i in range(len(byte_list)):
    
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
            
        circuits.append(bv_circuit)
        
    return circuits