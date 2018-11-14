from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)
CORS(application)
application.debug = True
application.config.from_object('config')
db = SQLAlchemy(application)
db.create_all()