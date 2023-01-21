# ROUTER
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

# CONTROLLERS IMPORTS
from controllers import parse_word

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# API Route
@app.route("/parse_word")
@cross_origin()
def parse_word_call():
    return jsonify(parse_word("Toronto")), 200


if __name__ == "__main__":
    app.run(debug = True);