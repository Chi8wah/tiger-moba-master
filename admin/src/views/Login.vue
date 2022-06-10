<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="model.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button @click="faceLogin">faceLogin</el-button>
        </el-form-item>
      </el-form>
      <get-face></get-face>
    </el-card>
  </div>
</template>

<script>
import GetFace from "../views/GetFace.vue";

export default {
  components: {
    GetFace,
  },
  data() {
    return {
      // 用户表单信息
      model: {},
    };
  },
  methods: {
    async login() {
      // 人脸信息置空
      this.model.isFaced = false;
      this.model.img = undefined;
      // 发送登录请求
      const res = await this.$http.post("/login", this.model);
      // 存储返回的令牌及权限
      localStorage.token = res.data.token;
      localStorage.auth = res.data.auth;
      // 跳转至主页，并显示登录成功消息
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
    async faceLogin() {
      const img = this.getPhoto(); // 获取摄像头图像并保存
      this.model.img = img;
      this.model.isFaced = true;
      const res = await this.$http.post("/login", this.model); // 发送登录请求
      // 保存令牌及权限
      localStorage.token = res.data.token;
      localStorage.auth = res.data.auth;
      this.$router.push("/"); // 跳转至主页
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
    // 获取摄像头图像并保存
    getPhoto: function () {
      const video = document.querySelector("#video"); // 获取摄像头渲染对象
      const canvas4 = document.getElementById("canvas4"); // 获取可绘画元素
      const context4 = canvas4.getContext("2d"); // 获取元素可绘画区域
      context4.drawImage(video, 0, 0, 400, 300); // 将video对象内指定的区域捕捉绘制到画布上指定的区域，实现拍照。
      var new_img = document.createElement("img"); // 生成图片元素
      new_img.setAttribute("crossOrigin", "anonymous");
      new_img.src = canvas4.toDataURL("image/jpeg"); // 保存图片并转为base64格式
      const result = new_img.src.replace(/^data:image\/\w+;base64,/, "");
      return result; // 去除格式头只保留base64字符串并返回
    },
  },
};
</script>
<style  >
.login-card {
  width: 80%;
  min-width: 500px;
  margin: 5% auto 0 auto;
}
</style>