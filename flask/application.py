from flask import Flask, request, jsonify

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
    ret = 'Valid JSON received\nJSON: ' + str(request.json)
    return ret

@application.route('/api/v1/search-grid/<title>', methods=['GET'])
def search_grid(title):
    return title

if __name__ == "__main__":
    application.run()