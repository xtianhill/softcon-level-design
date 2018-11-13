from flask import Flask, request, jsonify
from application import db
from grid import Grid
from application.__init__ import application

@application.route('/', methods=['GET'])
def hello():
    return 'Level Design backend is running'

@application.route('/api/v1/add-grid/', methods=['POST'])
def add_grid():
    if not request.json:
        return 'ERROR: invalid input'
    title = request.json['title']
    data = request.json['data']
    db_grid = Grid(title, data)
    try:
        result = db.session.add(db_grid)
        db.session.commit()
    except:
        db.session.rollback()
    finally:
        return str(result)

@application.route('/api/v1/query-all/', methods=['GET'])
def get_all():
    res = Grid.query.all()
    return str(res)

@application.route('/api/v1/search-grid/<search_title>', methods=['GET'])
def search_grid(search_title):
    my_grid = Grid.query.filter(Grid.title == search_title).first()
    return str(my_grid)

if __name__ == "__main__":
    # db.create_all()
    application.run()
