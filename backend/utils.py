# UTILS

def word_to_byte_list(word, nb_qubits) :
        #convert text to binary
        a_byte_array = bytearray(word, "utf8")
        byte_list = []


        for byte in a_byte_array:
            binary_representation = bin(byte)
            byte_list.append(binary_representation[9-nb_qubits:])
            #chop off the "0b" at the beginning. can also truncate the binary to fit on a device with N qubits
            #binary has 2 extra digits for "0b", so it starts at 9 for our 7 bit operation. 

        return byte_list