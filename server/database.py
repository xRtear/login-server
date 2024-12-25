import os
import json


# 定义简单的文件存储类,为节省资源，不使用数据库，采用文件形式进行数据存储
# 用户数据
class UserDatabase:
    def __init__(self, filename='data/users.json'):
        self.filename = filename
        # 如果文件不存在，则初始化为空字典
        if not os.path.exists(self.filename):
            with open(self.filename, 'w') as f:
                json.dump({}, f)

    def load_users(self):
        with open(self.filename, 'r') as f:
            return json.load(f)

    def save_users(self, users):
        with open(self.filename, 'w') as f:
            json.dump(users, f)

    def add_user(self, username, password):
        users = self.load_users()
        users[username] = password
        self.save_users(users)

    def get_user(self, username):
        users = self.load_users()
        return users.get(username)


class BrowsingHistory:
    def __init__(self, filename='data/history.json'):
        self.filename = filename
        # 如果文件不存在，则初始化为空字典
        if not os.path.exists(self.filename):
            with open(self.filename, 'w') as f:
                json.dump({}, f)

    def load_history(self):
        with open(self.filename, 'r') as f:
            return json.load(f)

    def save_history(self, history_data):
        with open(self.filename, 'w') as f:
            json.dump(history_data, f)

    def update_history(self, username, history):
        history_data = self.load_history()
        history_data[username] = history
        self.save_history(history_data)

    def get_history(self, username):
        history = self.load_history()
        return history.get(username)
