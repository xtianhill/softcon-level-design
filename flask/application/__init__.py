from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__, template_folder='../templates', static_folder='../static', static_url_path='')
cors = CORS(application, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(application, resources={r"/api/*": {"origins": "http://localhost:port"}})

application.debug = True
application.config.from_object('config')
db = SQLAlchemy(application)
db.create_all()