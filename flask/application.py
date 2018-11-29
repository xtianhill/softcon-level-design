from flask import Flask, request, jsonify, render_template, send_from_directory, Response
from flask_cors import CORS
from application import db
from grid import Grid
from application.__init__ import application
from sqlalchemy import exc
import json

HTTP_OK = 200
HTTP_CREATED = 201
HTTP_BADREQUEST = 400
HTTP_NOTFOUND = 404
HTTP_CONFLICT = 409

def validate_json(my_json):
    if "title" not in my_json or "data" not in my_json:
        print "JSON doesn't have proper keys."
        return False
    return True

@application.route('/api/v1/backend-up', methods=['GET'])
def hello():
    return Response("BACKEND RUNNING", status=200)

@application.route('/db_tests', methods=['GET'])
def db_test():
    return render_template('index2.html')

@application.route('/index', methods=['GET'])
def index():
    return render_template('index.html')

@application.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('../static', path)

@application.route('/play/<title>')
def play_grid(title):
    return send_from_directory('../static', title)

@application.route('/api/v1/add-grid/', methods=['POST'])
def add_grid():
    print "request: " + str(request.headers)
    if not validate_json(request.get_json()):
        print "Error: invalid JSON"
        response = Response("Error: invalid JSON", status=HTTP_BADREQUEST)
    else:
        my_json = json.loads(request.get_json())
        my_title = my_json["title"]
        my_data = my_json["data"]
        my_grid = Grid(my_title, my_data)
        try:
            exists = db.session.query(Grid.title).filter_by(title=my_title).scalar() is not None
            if exists:
                raise exc.DataError("", "", "", False, 0)
            db.session.add(my_grid)
            db.session.commit()
            response = Response(my_json, status=HTTP_CREATED, mimetype='application/json') 
            print "SUCCESS: entry added to DB"
        except exc.DataError:
            db.session.rollback()
            response = Response(my_json, status=HTTP_CONFLICT, mimetype='application/json')
        finally:
            db.session.close()
    return response

@application.route('/api/v1/update-grid/', methods=['POST'])
def update_grid():
    print "request: " + str(request.headers)
    if not validate_json(request.get_json()):
        print "Error: invalid JSON"
        response = Response(status=HTTP_BADREQUEST)
    else:
        my_json = json.loads(request.get_json())
        my_title = my_json["title"]
        new_data = my_json["data"]
        try:
            exists = db.session.query(Grid.title).filter_by(title=my_title).scalar() is not None
            if not exists:
                raise exc.DataError("", "", "", False, 0)
            my_grid = Grid.query.filter_by(title=my_title).first()
            my_grid.data = new_data
            db.session.commit()
            response = Response(my_title, status=HTTP_CREATED, mimetype='application/json') 
            print "SUCCESS: entry updated in DB"
        except exc.DataError:
            db.session.rollback()
            response = Response(my_title, status=HTTP_NOTFOUND, mimetype='application/json')
        finally:
            db.session.close()
        print "Update grid: " + str(response)
    return response

@application.route('/api/v1/query-all-titles/', methods=['GET'])
def get_all_titles():
    try:
        titles_json = json.dumps(db.session.query(Grid.title).all())
        db.session.expunge_all()
        response = Response(titles_json, status=HTTP_OK, mimetype='application/json')
    except Exception as e:
        print e
        db.session.rollback()
        response = Response(status=HTTP_BADREQUEST)
    finally:
        db.session.close()
    return response

@application.route('/api/v1/query-all/', methods=['GET'])
def get_all():
    try:
        grids = Grid.query.all()
        grids_string = str(grids)
        db.session.expunge_all()
        response = Response(grids_string, status=HTTP_OK, mimetype='application/json')
    except Exception as e:
        print e
        db.session.rollback()
        response = Response(status=HTTP_BADREQUEST)
    finally:
        db.session.close()
    return response

@application.route('/api/v1/search-grid/<search_title>', methods=['GET'])
def search_grid(search_title):
    try:
        result = Grid.query.filter(Grid.title == search_title).first()
        db.session.expunge_all()
        result_json = json.dumps(result.data)
        response = Response(result_json, status=HTTP_OK, mimetype='application/json')
    except AttributeError as e:
        print e
        db.session.rollback()
        response = Response(status=HTTP_NOTFOUND)
    except Exception as e:
        print e
        db.session.rollback()
        response = Response(status=HTTP_BADREQUEST)
    finally:
        db.session.close()
    return response

@application.route('/api/v1/delete-grid/<delete_title>', methods=['GET'])
def delete_grid(delete_title):
    try:
        exists = db.session.query(Grid.title).filter_by(title=delete_title).scalar() is not None
        if not exists:
            raise exc.DataError("", "", "", False, 0)
        Grid.query.filter_by(title=delete_title).delete()
        db.session.commit()
        response = Response(delete_title, status=HTTP_OK)
    except exc.DataError:
        db.session.rollback()
        response = Response(delete_title, status=HTTP_NOTFOUND)
    finally:
        db.session.close()
    return response

if __name__ == "__main__":
    application.run(host='0.0.0.0')