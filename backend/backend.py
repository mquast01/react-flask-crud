import sqlite3
from flask import Flask, g, jsonify, request
from flask_cors import CORS
import json
DATABASE = 'test.db'

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    #for user in query_db('SELECT * FROM USERS'):
        #print(user['Name'], 'has the id', user['Id'])
    return jsonify(query_db('SELECT * FROM users'))

@app.route('/edit/<int:user_id>', methods=['GET', 'POST'])
def edit(user_id):
    #for user in query_db('select Id from users where Id = ?', [user_id]):
    #    print(user['Name'], 'has the id', user['Id'])
    if request.method == 'POST':
        print(request.form)
        name = request.form.get('Name')
        id = request.form.get('Id')
        points = request.form.get('Points') 
        return '''
                  <h1>The Name value is: {}</h1>
                  <h1>The Id value is: {}</h1>
                  <h1>The Points value is: {}</h1>'''.format(name, id, points)
    
    #return jsonify(query_db('select * from users where Id=?', [user_id], one=True))
    return '''
              <form method="POST">
                  <div><label>Name: <input type="text" name="Name"></label></div>
                  <div><label>Id: <input type="text" name="Id"></label></div>
                  <div><label>Points: <input type="text" name="Points"></label></div>
                  <input type="submit" value="Submit">
              </form>'''

@app.route('/create', methods=['GET', 'POST'])
def create():
    #for user in query_db('select Id from users where Id = ?', [user_id]):
    #    print(user['Name'], 'has the id', user['Id'])
    if request.method == 'POST':
        #data = request.data.decode('utf8')
        #data = json.loads(data)
        data = request.get_json()
        print(data)
        name = data['Name']
        id = data['Id']
        points = data['Points'] 
        #//print(request.method)
        #print(request.form)
        query_db('INSERT INTO users (Name, Id, Points) VALUES (?, ?, ?)', [name, id, points])
        get_db().commit()
        return '''
                  <h1>The Name value is: {}</h1>
                  <h1>The Id value is: {}</h1>
                  <h1>The Points value is: {}</h1>'''.format(name, id, points)
    
    #return jsonify(query_db('select * from users where Id=?', [user_id], one=True))
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

