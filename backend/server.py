from flask import Flask

from parse import wave_parse

app = Flask(__name__)

# API Route
@app.route("/")
def default():
    return wave_parse()



if __name__ == "__main__":
    app.run(debug = True);