<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "添加" }}管理员</h1>
    <el-form
      :model="model"
      ref="editAdminForm"
      label-width="120px"
      @submit.native.prevent="save"
      :rules="editAdminRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="model.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="model.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="auth">
        <el-radio v-model="model.auth" :label="1">超级管理员</el-radio>
        <el-radio v-model="model.auth" :label="0">普通管理员</el-radio>
      </el-form-item>
      <!-- 要加密密码的传输和保存！ -->
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="updateFace">updateFace</el-button>
      </el-form-item>
      <get-face></get-face>
    </el-form>
  </div>
</template>

<script>
import GetFace from "../views/GetFace.vue";
export default {
  components: {
    GetFace,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
        auth: 0,
      },
      editAdminRules: {
        username: [
          {
            type: "string",
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
        auth: [
          {
            required: true,
            message: "请选择权限",
            trigger: "blur",
          },
        ],
      },
      parents: [],
    };
  },
  methods: {
    async save() {
      this.$refs.editAdminForm.validate(async (valid) => {
        if (valid) {
          if (this.id) {
            await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
          } else {
            const res = await this.$http.post("/user", {
              username: this.model.username,
            });
            console.log(res);

            if (res.data.isUsernameUnused) {
              await this.$http.post("/rest/admin_users", this.model);
              this.$router.push("/admin_users/list");
              this.$message({
                type: "success",
                message: "保存成功",
              });
            } else {
              this.$message({
                type: "fail",
                message: "用户名已存在",
              });
            }
          }
        } else {
          this.$message({
            type: "fail",
            message: "请补充完整字段",
          });
        }
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`/rest/admin_users`);
      this.parents = res.data;
    },
    async updateFace() {
      if (!this.id) {
        // 若无id则进行提示
        this.$message({
          type: "fail",
          message: "请先添加该管理员再更新人脸",
        });
        return;
      }
      const img = this.getPhoto(); // 获取摄像头图像并保存
      this.model.img = img;
      this.model.id = this.id;
      // 发送新增/更新请求
      await this.$http.post("/rest/admin_users/face", this.model);
      this.$router.push("/admin_users/list"); // 跳转至列表页
      this.$message({
        type: "success",
        message: "更新人脸信息成功",
      });
    },
    //拍照
    getPhoto: function () {
      const video = document.querySelector("#video");
      const canvas4 = document.getElementById("canvas4");
      const context4 = canvas4.getContext("2d");
      context4.drawImage(video, 0, 0, 400, 300); //将video对象内指定的区域捕捉绘制到画布上指定的区域，实现拍照。
      var new_img = document.createElement("img");
      new_img.setAttribute("crossOrigin", "anonymous");
      new_img.src = canvas4.toDataURL("image/jpeg"); //图片转为base64格式
      const result = new_img.src.replace(/^data:image\/\w+;base64,/, "");
      return result;
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  },
};
</script>
