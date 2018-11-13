from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from __init__ import db

class Grid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), unique=True, nullable=False)
    data = db.Column(db.Text, unique=False, nullable=True)

    def __init__(self, title, data):
        self.title = title
        self.data = data

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return "{{\"title\":\"{0}\",\"data\":\"{1}\"}}".format(self.title, self.data)