from flask import Flask
from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)
application.debug = True
application.config.from_object('config')
db = SQLAlchemy(application)
db.create_all()