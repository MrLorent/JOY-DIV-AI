# ROUTER
from flask import Flask

from controllers import wave_parse

app = Flask(__name__)

# API Route
@app.route("/parse_word")
def parse_word():
    return wave_parse()

@app.route("/parse_sentence")
def parse_sentence():
    return wave_parse()



if __name__ == "__main__":
    app.run(debug = True);