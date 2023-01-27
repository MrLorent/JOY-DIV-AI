# ROUTER
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

# CONTROLLERS IMPORTS
from controllers import parse_word_by_letters, parse_text

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# API Routes
@app.route("/submit/word", methods=['POST'])
@cross_origin()
def parse_word():
    word = request.form['text']
    return jsonify(parse_word_by_letters(word)), 200

@app.route("/submit/text", methods=['POST'])
@cross_origin()
def parse_text_by_sentences_or_words():
    text = request.form['text']
    print(text)
    return jsonify(parse_text(text)), 200

@app.route("/example/word")
@cross_origin()
def parse_word_example():
    return jsonify(parse_word("Toronto")), 200


if __name__ == "__main__":
    app.run(debug = True);