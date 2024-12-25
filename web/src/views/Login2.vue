<template>
  <div class="login-container">
    <h1>登录</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>
      <div class="form-group">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const form = ref({
      username: "",
      password: "",
    });
    const router = useRouter();

    const handleLogin = async () => {
      try {
        // 调用后端登录接口
        const response = await axios.post("/api/login", form.value);
        if (response.data.success) {
          alert("登录成功！");
          // 保存用户信息或 token
          localStorage.setItem("token", response.data.token);
          // 跳转到主页
          router.push("/home");
        } else {
          alert("登录失败：" + response.data.message);
        }
      } catch (error) {
        alert("登录失败，请检查网络或稍后再试。");
        console.error(error);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #5c3698;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #5c3698;
}
</style>
