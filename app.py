from flask import Flask, jsonify, render_template
import pandas as pd 
import json

app = Flask(__name__)

@app.route("/")
def main(): 
    return render_template('index_CC_GL.html')

@app.route("/map")
def map(): 
    return render_template('index_leaflet_GL.html')

@app.route("/sample")
def sample(): 
    # df = pd.read_json('sample.json')
    # dict_data = df.to_dict()
    f = open('Data Merge/sample.json')
    dict_data = json.load(f)
    return jsonify(dict_data)

if __name__ == '__main__': 
    app.run(debug=True)