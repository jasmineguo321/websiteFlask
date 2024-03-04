#Flask app for Flask + Firebase + Arduino
#Coded by Jasmine Guo
# Filename: app.py

from flask import Flask, render_template, url_for, request, jsonify
from datetime import datetime
# import pyrebase

app = Flask(__name__)

config = {}
key = 0

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/authors")
def authors():
    return render_template("authors.html")

@app.route("/procedure")
def procedure():
    return render_template("procedure.html")

@app.route("/results")
def results():
    return render_template("results.html")

@app.route("/test", methods=['GET', 'POST'])
def test():
    global config, userID, db, timeStamp, key
    
    if request.method == 'POST':
        timeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

        config = request.get_json()
        userID = config.pop('userID')

        print('User ID: ' + userID, flush = True)
        print(config, flush = True)

        # firebase = pyrebase.initialize_app(config)

        # db = firebase.database()

        # db.child('users/' + userID + '/data/' + '/' + timeStamp).update({'testKey':'testValue'})

        return 'Success', 200
    
    else:
        if(bool(config) is False):
            print("FB config is empty")

        else:
            value = request.args.get('distance')
            print('Distance: ' + value, flush = True)

            db.child('users/' + userID + '/data/' + '/' + timeStamp).update({key:value})

            key += 1

        return "Success"

if __name__ == "__main__":
    app.run(debug= False, host='10.181.138.177', port=5000)
