from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

# client = MongoClient('mongodb+srv://seungil:1234@tpa2.lxcklpi.mongodb.net/?retryWrites=true&w=majority')
client = MongoClient(
    'mongodb+srv://test:sparta@cluster0.ovn83ml.mongodb.net/?retryWrites=true&w=majority')
db = client.TPA2


@app.route('/')
def home():
    return render_template('introduce.html')


@app.route("/comment", methods=["POST"])
def comment_post():
    target = request.form['target']
    author = request.form['author']
    contents = request.form['contents']

    comments = list(db.comment.find({}, {'_id': False}))
    count = len(comments) + 1

    doc = {
        'num': count,
        'target': target,
        'author': author,
        'contents': contents,
        'deleted': False,
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '방명록 남기기 완료!'})


@app.route("/comment", methods=["GET"])
def comment_get():
    target = request.args['target']
    comments = list(db.comment.find(
        {'target': target, 'deleted': False}, {'_id': False}))
    return jsonify({'data': comments})


@app.route("/comment", methods=["DELETE"])
def comment_delete():
    num = request.form['num']
    db.comment.delete_one({'num': int(num)})
    return jsonify({'msg': '방명록 삭제 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
