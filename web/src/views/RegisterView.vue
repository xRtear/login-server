<template>
  <div id="login_box">
    <h2>REGISTER</h2>
    <form @submit.prevent="handleLogin">
        <input
            type="text"
            v-model="registerUsername"
            placeholder="请输入用户名"
            required
        />
      <div class="input_box">
        <input
            type="password"
            v-model="registerPassword"
            placeholder="请输入密码"
            required
        />
      </div>
      <div class="input_box">
        <input
            type="password"
            v-model="confirmPassword"
            placeholder="确认密码"
            required
        />
      </div>
      <button type="button" @click="returnLogin">返回登录</button>
      <button type="submit" class="custom-button" @click="registerUser">
        确认注册
      </button>
      <br/>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      errorMessage: "",
      registerUsername: '',
      registerPassword: '',
      confirmPassword: "",
    };
  },
  methods: {
    handleLogin() {
      // 登录逻辑
      if (this.registerUsername === "" || this.registerPassword === "") {
        this.errorMessage = "用户名和密码不能为空";
      } else {
        this.errorMessage = "";
        // 处理登录请求的代码
      }
    },
    returnLogin() {
      this.$router.push('/');
    },

    registerUser() {
      // 处理注册逻辑
      console.log('注册用户:', this.registerUsername, this.registerPassword);
      // 注册成功后关闭弹窗

    }
  },
};
</script>

<style scoped>
#login_box {
  width: 20%;
  height: 300px;
  background-color: #00000060;
  margin: auto;
  margin-top: 10%;
  text-align: center;
  border-radius: 10px;
  padding: 50px 50px;
}

h2 {
  color: #ffffff90;
  margin-top: 5%;
}

#input_box {
  margin-top: 5%;
}

span {
  color: #fff;
}

input {
  border: 0;
  width: 60%;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  outline: none;
  margin-top: 10px;
}

button {
  margin-top: 50px;
  width: 35%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to left, #30cfd0, #330867);
}

.custom-button {
  margin-top: 50px;
  width: 35%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to right, #30cfd0, #330867);
}

#errorMessage {
  color: red;
  font-size: 0.9em;
  text-align: center;
  margin-top: 10px;
}
</style>
