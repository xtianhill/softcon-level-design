from flask import Flask, request, jsonify
from application import db

application = Flask(__name__)
application.debug = True

@application.route('/', methods=['GET'])
def hello():
    return 'wrong URL: try using .../api/v[n]/...'

@application.route('/test', methods=['GET'])
def test():
    return 'Level Design backend is running'

@application.route('/api/v1/add-grid/', methods=['POST'])
def add_grid():
    if not request.json:
        return 'ERROR: invalid input'
    print request
    ret = 'Valid JSON received\nJSON: ' + str(request.json)
    return ret

@application.route('/api/v1/add-grid/TEST-INFO/', methods=['POST'])
def add_test_grid():
    ret = str(db.get_engine())
    return ret

@application.route('/api/v1/add-grid/TEST-BUILD/', methods=['POST'])
def build_table():
    result = db.engine.execute("CREATE TABLE grid (title string, x int, y int); ")
    # name = []
    # for row in result:
    #     name.append(row[0])
    return str(result)

@application.route('/api/v1/add-grid/TEST-TABLE/', methods=['GET'])
def test_table():
    result = db.engine.execute("CREATE TABLE grid (title string, x int, y int); ")
    return result

@application.route('/api/v1/search-grid/<title>', methods=['GET'])
def search_grid(title):
    return title

db.init_app(application)
if __name__ == "__main__":
    application.run()