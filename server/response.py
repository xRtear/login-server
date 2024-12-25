from flask import jsonify

def success‌(msg):
    return jsonify({
        "code":0
        "msg": msg}), 200