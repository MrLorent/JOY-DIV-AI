# ROUTER
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

# CONTROLLERS IMPORTS
from controllers import parse_word_by_letters, parse_text

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#=============== ROUTES ===============#

#--------------- WORD ---------------#
@app.route("/submit/word", methods=['POST'])
@cross_origin()
def parse_word():
    word = request.json.get("parsed_poem", None)
    print("Word received :", word)
    return jsonify(parse_word_by_letters(word[0])), 200

#--------------- TEXT ---------------#
@app.route("/submit/text", methods=['POST'])
@cross_origin()
def parse_text_by_sentences_or_words():
    text = request.json.get("parsed_poem", None)
    print("Text received :", text)
    return jsonify(parse_text(text)), 200


if __name__ == "__main__":
    app.run(debug = True);