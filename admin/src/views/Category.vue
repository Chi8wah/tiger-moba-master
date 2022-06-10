<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告</template>
            <el-menu-item index="/ads/create">新建广告</el-menu-item>
            <el-menu-item index="/ads/list">广告列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">行为分析</template>
            <el-menu-item index="/tea/index">主页访问分析</el-menu-item>
            <el-menu-item index="/tea/article">文章访问分析</el-menu-item>
            <el-menu-item index="/tea/hero">英雄页访问分析</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group v-if="this.auth == 1">
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">添加管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-button size="small" v-on:click="logOut">登出</el-button>
        <span class="sys-auther-name">作者：吴梓华</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.sys-auther-name {
  margin-left: 10px;
  font-style: italic;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      auth: 0,
    };
  },
  methods: {
    logOut: function () {
      localStorage.clear();
      location.reload();
    },
  },
  created: function () {
    this.auth = parseInt(localStorage.auth ?? 0);
  },
};
</script>