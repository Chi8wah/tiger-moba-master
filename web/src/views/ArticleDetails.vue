<template>
  <div id="mod_player">
    <!-- 文章标题 -->
    <h2 id="detail-title">{{ detail.title }}</h2>
    <!-- 更新时间 -->
    <div id="updated-time">
      {{ "更新时间：" + detail.updatedAt }}
    </div>
    <div id="detial-divider"></div>
    <!-- 文章内容 -->
    <div id="detail-body" v-html="detail.body"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timeZone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timeZone);
export default {
  data() {
    return {
      detail: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    async fetch() {
      // 获取文章id
      const hash = window.location.hash.replace(/(#\/)?/, "");
      // 根据id请求文章
      const res = await this.$http.get(`/${hash}`);
      // 更新文章内容
      this.detail = res.data;
      this.detail.updatedAt = dayjs(this.detail.updatedAt)
        .tz("PRC")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    async postTea() {
      // 获取文章id
      const hash = window.location.hash.replace(/(#\/articles\/)?/, "");
      const teaData = {
        viewedid: hash,
        time: dayjs().tz("PRC"),
        type: "Article",
      };
      await this.$http.post("/tea", teaData);
    },
  },
  created() {
    this.fetch();
    this.postTea();
  },
};
</script>

<style scoped>
#detial-divider {
  width: 100%;
  height: 0;
  margin: 0 0 20px 0;
  padding: 0;
  border-bottom: 1px solid grey;
}
</style>
<style>
#mod_player img {
  height: auto;
  max-width: 100%;
}
#mod_player {
  font-size: 0.28rem;
  line-height: 0.5rem;
  padding: 0 0.2rem;
}

#mod_player span {
  font-size: 0.28rem !important;
  line-height: 0.5rem !important;
}

#mod_player p {
  font-size: 0.28rem !important;
  line-height: 0.5rem !important;
}

#mod_player h4 {
  font-size: 0.28rem !important;
  line-height: 0.5rem !important;
}

#mod_player h1 {
  background-size: 6.54rem 0.66rem;
  width: 6.54rem;
  height: 0.66rem;
  line-height: 0.66rem;
  padding-left: 0.2rem;
  box-sizing: border-box;
  font-size: 0.3rem;
  color: #caf2ff;
  margin: 20px 0;
  font-weight: 700;
}

#mod_player h1 span {
  font-size: inherit !important;
  line-height: inherit !important;
}

#mod_player h2 {
  background-size: 6.54rem 0.66rem;
  width: 6.54rem;
  height: 0.66rem;
  line-height: 0.66rem;
  padding-left: 0.2rem;
  font-size: 0.28rem;
  color: #1f1e1f;
  margin: 20px 0;
  font-weight: 700;
  box-sizing: border-box;
}

#mod_player h2 span {
  font-size: inherit !important;
  line-height: inherit !important;
  color: inherit !important;
}

#mod_player h3 {
  background-size: 6.01rem 0.59rem;
  width: 6.54rem;
  height: 0.59rem;
  line-height: 0.59rem;
  padding-left: 1.1rem;
  font-size: 0.28rem;
  color: #1f1e1f;
  margin: 20px 0;
  font-weight: 700;
  box-sizing: border-box;
  position: relative;
}

#mod_player h3 span {
  font-size: inherit !important;
  line-height: inherit !important;
  color: inherit !important;
}

#mod_player h3 img {
  width: 0.86rem !important;
  height: 0.86rem !important;
  border-radius: 100%;
  position: absolute;
  left: 0.1rem;
  top: -0.13rem;
  margin: 0;
}

#mod_player blockquote {
  position: relative;
  margin: 20px 0;
  background: #f1f1f1;
  border: 1px solid #bdb9b9;
  border-radius: 10px;
  padding: 0.15rem 0.3rem;
  line-height: 0.26rem;
  font-size: 0.28rem;
  color: #1f1e1f;
  width: 6.44rem;
  box-sizing: border-box;
}

#mod_player blockquote p {
  position: relative;
  background: #f1f1f1;
}

#mod_player blockquote:before {
  content: "";
  position: absolute;
  bottom: -0.1rem;
  right: -0.1rem;
  width: 6.44rem;
  height: 100%;
  border: 1px dashed #bdb9b9;
  z-index: -1;
  border-radius: 10px;
}
</style>

