# ROUTER
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

# CONTROLLERS IMPORTS
from controllers import parse_word

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# API Routes
@app.route("/submit/text", methods=['POST'])
@cross_origin()
def get_text_noise():
    text = request.form['text']
    
    if("\n" in text):
        print("\n", text, "contains new lines")
    elif(" " in text):
        print("\n", text, "contains spaces\n")
    else:
        print("\n", text, "is just a word\n")
        return jsonify(parse_word(text)), 200

@app.route("/example/word")
@cross_origin()
def get_word_noise_example():
    return jsonify(parse_word("Toronto")), 200


if __name__ == "__main__":
    app.run(debug = True);