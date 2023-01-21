# ROUTER
from flask import Flask

from controllers import parse_string

app = Flask(__name__)

# API Route
@app.route("/parse_word")
def parse_word():
    return parse_string("Toronto")


if __name__ == "__main__":
    app.run(debug = True);