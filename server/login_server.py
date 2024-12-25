from flask import Flask, request, Blueprint, jsonify
from database import UserDatabase, BrowsingHistory
from response import Response

app = Flask(__name__)

# 创建一个 Blueprint
mod = Blueprint('mod', __name__, url_prefix='/hellologin')

user_db = UserDatabase()  # 创建用户数据库实例
history_db = BrowsingHistory()  # 创建浏览历史数据库实例


@mod.route('/login', methods=['POST'])
def login():
    """用户登录接口"""
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "用户名和密码不能为空"}), 400

    stored_password = user_db.get_user(username)
    if stored_password and stored_password == password:
        Response.success‌("登录成功！")
    else:
        return jsonify({"error": "用户名或密码错误"}), 401


@mod.route('/register', methods=['POST'])
def register():
    """用户注册接口"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "用户名和密码不能为空"}), 400

    if user_db.get_user(username):
        return jsonify({"error": "该用户名已存在，请选择其他用户名!"}), 400

    user_db.add_user(username, password)
    return jsonify({"message": "注册成功!"}), 201


@mod.route('/history', methods=['POST'])
def browsing_history():
    data = request.get_json()
    username = data.get('username')
    history = data.get('history')

    history_db.update_history(username, history)
    return jsonify({"message": "记录成功!"}), 201


@mod.route('/')
def home():
    return "欢迎访问用户管理系统 API"

# 注册 Blueprint
app.register_blueprint(mod)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7999, debug=True)
