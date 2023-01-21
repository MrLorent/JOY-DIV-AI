# ROUTER
from flask import Flask

from controllers import parse_word

app = Flask(__name__)

# API Route
@app.route("/parse_word")
def parse_word_call():
    return parse_word("Toronto")


if __name__ == "__main__":
    app.run(debug = True);