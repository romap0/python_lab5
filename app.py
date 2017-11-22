import random
from flask import Flask, jsonify, abort, send_from_directory
from helpers import get_famous_names, get_image

app = Flask(__name__, static_url_path='', static_folder='assets')
names = get_famous_names()

games = []


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/api/names', methods=['GET'])
def get_names():
    return jsonify(names)


@app.route('/api/startGame/<int:level>', methods=['GET'])
def startGame(level):
    max_index = 0

    if level == 1:
        max_index = 9
    elif level == 2:
        max_index = 49
    elif level == 3:
        max_index = 95
    else:
        abort(400)

    name = names[random.randint(0, max_index)]
    image = get_image(name)

    game = {
        'id': len(games),
        'name': name,
        'image': image
    }
    games.append(game)

    return jsonify({'id': game['id'], 'image': image})


@app.route('/api/finishGame/<int:gameId>/<string:name>', methods=['GET'])
def finishGame(gameId, name):
    game = games[gameId]

    if game['name'].strip() == name:
        return jsonify(True)
    else:
        return jsonify(False)


if __name__ == '__main__':
    app.run(debug=True)
