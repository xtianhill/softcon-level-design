from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from application import db
from grid import Grid
from application.__init__ import application
import json

@application.route('/', methods=['GET'])
def hello():
    return 'Level Design backend is running'

@application.route('/db_tests', methods=['GET'])
def db_test():
    return render_template('index2.html')

@application.route('/index', methods=['GET'])
def index():
    return render_template('index.html')

@application.route('/static/<path:path>')
def send_js(path):
    print str(path)
    return send_from_directory('../static', path)

@application.route('/api/v1/add-grid/', methods=['POST'])
def add_grid():
    if not request.json:
        return 'ERROR: invalid input'
    try:
        my_json = json.loads(request)
        title = my_json.json['title']
        data = my_json.json['data']
        db_grid = Grid(title, data)
        result = db.session.add(db_grid)
        return str(my_json)
        # db.session.commit()
    except:
        db.session.rollback()
    finally:
        db.session.close()
    return request

@application.route('/api/v1/query-all/', methods=['GET'])
def get_all():
    result = ""
    try:
        result = Grid.query.all()
        # db.session.commit()
        db.session.expunge_all()
    except:
        db.session.rollback()
    finally:
        db.session.close()
    # res = Grid.query.all()
    return str(result)

@application.route('/api/v1/search-grid/<search_title>', methods=['GET'])
def search_grid(search_title):
    result = ""
    try:
        result = Grid.query.filter(Grid.title == search_title).first()
        # db.session.commit()
        db.session.expunge_all()
    except:
        db.session.rollback()
    finally:
        db.session.close()
    return str(result)

if __name__ == "__main__":
    # db.create_all()
    application.run()
