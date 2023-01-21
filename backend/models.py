# MODELS
from qiskit import IBMQ

def connexion():
    # Loading your IBM Q account(s)
    IBMQ.save_account('0ebf515971d26d25134acac3a0d10e36ddf8713377db17e66733b704c73b29b4fbe4fdaf0b55f51afd7e452956a0d4cae700dc5d0c9c286fd33a3dda610971dd', overwrite=True)
    IBMQ.load_account()
    provider = IBMQ.get_provider(hub = 'ibm-q')
    backend = provider.get_backend('ibm_oslo')
    print("hardcoded to run on ", backend)

    return backend