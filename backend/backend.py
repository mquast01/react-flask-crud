import sqlite3
from flask import Flask, g, jsonify, request
from flask_cors import CORS
import json
DATABASE = 'test.db'

app = Flask(__name__)
CORS(app)

@app.route("/")
def view_users():
    return jsonify(query_db('SELECT * FROM users'))

@app.route("/view/<int:user_id>")
def view(user_id):
    return jsonify(query_db('SELECT * FROM users WHERE id=?', [user_id]))

@app.route('/edit/<int:user_id>', methods=['GET', 'POST'])
def edit(user_id):
    if request.method == 'POST':
        #TODO: handle parsing errors/empty inputs 
        data = request.get_json()
        name = data['Name']
        id = data['Id']
        points = data['Points']

        query_db('UPDATE users SET Name = ?, Points = ? WHERE Id = ?', [name, points, id])
        get_db().commit()
        return 
    
    #maybe delete get method 
    return '''
              <form method="POST">
                  <div><label>Name: <input type="text" name="Name"></label></div>
                  <div><label>Id: <input type="text" name="Id"></label></div>
                  <div><label>Points: <input type="text" name="Points"></label></div>
                  <input type="submit" value="Submit">
              </form>'''

@app.route('/create', methods=['GET', 'POST'])
def create():

    if request.method == 'POST':

        data = request.get_json()
        print(data)
        name = data['Name']
        id = data['Id']
        points = data['Points'] 

        query_db('INSERT INTO users (Name, Id, Points) VALUES (?, ?, ?)', [name, id, points])
        get_db().commit()
        return 
    #maybe delete get method
    return '''
              <form method="POST">
                  <div><label>Name: <input type="text" name="Name"></label></div>
                  <div><label>Id: <input type="text" name="Id"></label></div>
                  <div><label>Points: <input type="text" name="Points"></label></div>
                  <input type="submit" value="Submit">
              </form>'''

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = make_dicts
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

