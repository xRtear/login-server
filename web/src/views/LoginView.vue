<template>
  <div id="login_box">
    <h2>LOGIN</h2>
    <el-form @submit.prevent="handleLogin" :rules="rules" ref="loginInfo">
        <input
            type="text"
            v-model="loginInfo.username"
            placeholder="请输入用户名"
            required
        />
      <div class="input_box">
        <input
            type="password"
            v-model="loginInfo.password"
            placeholder="请输入密码"
            required
        />
      </div>
      <button type="submit">登录</button>
      <button type="button" class="custom-button" @click="gotoRegister">
        注册
      </button>
      <br/>
    </el-form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import {login, test} from "@/api/user";

export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
        errorMessage: ""
      },
      loading: false,

      rules:{
        // 账号 用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        //密码
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      this.login();
      // this.$refs.loginInfo.validate(valid => {
      //   if (valid) {
      //
      //     this.loading = true;
      //     this.$store.dispatch("LoginSKL", this.loginInfo).then(() => {
      //       this.isLogin = true;
      //       this.$message.success('登录成功！');
      //       this.loading = false;
      //       // sessionStorage.setItem("username", this.loginInfo.username);
      //       // setSessionStorageWithExpiry("username", this.loginInfo.username,5);
      //       this.$router.push({path: this.redirect || "/home"}).catch(() => {
      //       });
      //     })
      //         .catch((error) => {
      //           // this.$message.error('登录失败：' + (error.message || '未知错误'));
      //           this.loading = false;
      //           this.loginInfo.errorMessage = error;
      //         });
      //   }
      // });
    },
    //登录接口
    async login() {
      const res = await login(this.loginInfo);
      if (res.status === 200) {
        this.$message.success('登录成功！')
      }
      console.log(res);

      }
    },

    gotoRegister() {
      this.$router.push('/register');
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
