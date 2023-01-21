# CONTROLLERS
from flask import jsonify
from collections import defaultdict

# CONSTANTS IMPORTS
from constants import NB_QUBITS

# MODELS IMPORT
from models import compute_circuits

# OTHER IMPORTS
from utils import word_to_byte_list
from qiskit_functions import prepare_quantum_circuit

def parse_string(string):
    byte_list = word_to_byte_list(string, NB_QUBITS)

    circuits = prepare_quantum_circuit(byte_list, NB_QUBITS)

    response = compute_circuits(circuits)
    

    # format data for from
    parsed_string = defaultdict(int)
    for letter in response:
        for key in letter:
            parsed_string[key] += letter[key]

    categories = []
    data = []
    for key in parsed_string:
        categories.append(key)
        data.append(parsed_string[key])

    json_parsed_string = {
        "categories": categories,
        "data": data
    }

    return jsonify(json_parsed_string)