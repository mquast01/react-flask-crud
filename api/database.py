import sqlite3
from flask import Flask, g, jsonify, request
from flask_cors import CORS
import json

from sqlalchemy import create_engine, select, update
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import Session, declarative_base, relationship, deferred

from flask_restx import Resource, Api, fields

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "SWhxbWnrPdMuLtxHDX1vn9Usga2vMiVwt75ep7JXevHGjd9mlUjb545wyzfXriyB" 
jwt = JWTManager(app)

Base = declarative_base()
app = Flask(__name__)
CORS(app)
api = Api(app)

resource_fields = api.model('Resource', {
    'nickname': fields.String,
    'username': fields.String,
    'email': fields.String,
})

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, nullable=False)
    nickname  = Column(String(16))
    username = Column(String(16), unique=True, nullable=False)
    email = Column(String(320), unique=True, nullable=False)
    password = deferred(Column(String(255), nullable=False))

    def __repr__(self):
        return '<User %r>' % self.username

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# an Engine, which the Session will use for connection
# resources
engine = create_engine('sqlite:///./database.db')

@api.route('/view')
class ViewUsers(Resource):
    def get(self):
        with app.app_context():
            with Session(engine) as session:
                users = session.query(
                    User.username, User.nickname, User.id, User.email
                )
                data = []                
                for u in users:
                    row = {}
                    for c in u._mapping:
                        row[c] = u[c]
                    data.append(row)
            return jsonify(data)

@api.route('/view/<int:user_id>')
class ViewUser(Resource): 
    def get(self, user_id):
        with Session(engine) as session:
            data = []
            user = session.query(
                User.username, User.nickname, User.id, User.email
                ).where(User.id == user_id).one()
            row = {}
            for c in user._mapping:
                row[c] = user[c]
            data.append(row)
        return jsonify(data)

@api.route('/edit/<int:user_id>', methods=['POST'])
class EditUser(Resource): 
    def edit(user_id):
        with Session(engine) as session:
                data = request.get_json()
                session.execute(
                    update(User)
                    .where(User.id == user_id)
                    .values(data)
                )
                session.commit()
        return '', 200        

@api.route('/create', methods=['POST'])
class CreateUser(Resource):
    def post(self):
        with Session(engine) as session:
            data = request.get_json()
            new_user = User(
                nickname=data["nickname"],
                username=data["username"],
                email=data["email"],
                password=data["password"]
            )
            session.add(new_user)
            session.commit()
        return '', 200
            

@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete(user_id):
    with Session(engine) as session:
        session.delete(User).where(User.id == user_id)
    return 200

if __name__ == '__main__':
    app.run(debug=True)