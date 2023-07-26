from sqlalchemy import MetaData
from sqlalchemy import Table, Column, Integer, String
from sqlalchemy import create_engine


engine = create_engine('sqlite:///./database.db')

metadata_obj = MetaData()

user = Table('user', metadata_obj,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('nickname', String(16)),
    Column('username', String(16), nullable=False),
    Column('email', String(320), unique=True, nullable=False),
    Column('password', String(50), nullable=False)
)

metadata_obj.create_all(engine)