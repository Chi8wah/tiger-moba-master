<template>
  <div id="detailBody">
    <div class="header-hero">
      <img :src="detail.banner" alt="" />
      <div class="hero-attribute">
        <p class="hero-title">{{ detail.title }}</p>
        <p class="hero-name">{{ detail.name }}</p>
        <p class="hero-location" data-herotype="3/">
          {{ detail.categories[0].name }}
        </p>
        <div class="hero-cover">
          <ul class="cover-list c">
            <li>
              生存
              <span
                class="cnver1 hero-attrsp hero-attr1-10"
                :class="`hero-attr1-${detail.scores.survive}`"
              ></span>
            </li>
            <li>
              攻击
              <span
                class="cnver2 hero-attrsp hero-attr2-3"
                :class="`hero-attr2-${detail.scores.attack}`"
              ></span>
            </li>
            <li>
              技能
              <span
                class="cnver3 hero-attrsp hero-attr3-4"
                :class="`hero-attr3-${detail.scores.skills}`"
              ></span>
            </li>
            <li>
              难度
              <span
                class="cnver4 hero-attrsp hero-attr4-3"
                :class="`hero-attr4-${detail.scores.difficult}`"
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content-hero slide-container" style="height: 2093px">
      <ul class="hero-nav slide-nav">
        <li class="current">
          <a href="javascript:;">英雄初识</a>
        </li>
      </ul>
      <div
        class="content-tab slide-content"
        style="
          position: relative;
          overflow: hidden;
          backface-visibility: hidden;
        "
      >
        <!-- 介绍 -->
        <div
          class="content-list slide-item current"
          style="
            position: absolute;
            top: 0px;
            left: 0px;
            transform: translateX(0px);
            visibility: visible;
          "
        >
          <!-- 技能 -->
          <div class="panel brtn">
            <div class="autom pr" id="PlusTab">
              <ul class="plus-tab c controller">
                <!-- 技能图片 -->
                <li
                  v-for="(skill, index) in detail.skills"
                  :key="skill._id"
                  @click="showSkill(index)"
                  :id="`skill-img-${index}`"
                >
                  <img :src="skill.icon" />
                </li>
              </ul>
              <!-- 技能描述 -->
              <ul class="plus-content content">
                <li
                  style="
                    display: list-item;
                    transform-origin: 0px 0px;
                    opacity: 1;
                    transform: scale(1, 1);
                  "
                >
                  <div class="plus-box c">
                    <span class="plus-name" data-skillid="10500">{{
                      curSkill.name
                    }}</span>
                    <span class="plus-value"
                      >(冷却值：{{ curSkill.delay }} 消耗：{{
                        curSkill.cost
                      }})</span
                    >
                  </div>
                  <p class="plus-int">
                    {{ curSkill.description }}
                  </p>
                  <p class="prompt">
                    {{ curSkill.tips }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 出装 -->
          <div class="panel brtn">
            <div class="autom">
              <h3 class="tit1 ic11">出装推荐</h3>
              <div class="skills-build">
                <p class="tit2">顺风出装</p>
                <ul
                  class="build-list equip-list"
                  data-item="1336|1421|1331|1333|1335|1332"
                >
                  <li v-for="(item, index) in detail.items1" :key="index">
                    <span class="build-img"
                      ><img :src="item.icon" alt="" /></span
                    ><span class="build-name">{{ item.name }}</span>
                  </li>
                </ul>
                <p class="prompt">
                  小提示：提高生存能力，在团战中控制敌人为队友提供更多的操作空间。
                </p>
              </div>
              <div class="skills-build brn">
                <p class="tit2">逆风出装</p>
                <ul
                  class="build-list equip-list"
                  data-item="1331|1421|1335|1137|1332|1338"
                >
                  <li v-for="(item, index) in detail.items2" :key="index">
                    <span class="build-img"
                      ><img :src="item.icon" alt="" /></span
                    ><span class="build-name">{{ item.name }}</span>
                  </li>
                </ul>
                <p class="prompt">
                  小提示：抓准时间进入战场利用位移技能接近敌方英雄并释放范围技能可以打出更多的伤害。
                </p>
              </div>
            </div>
          </div>
          <!-- 使用技巧 -->
          <div class="panel brt">
            <div class="autom">
              <h3 class="tit1 ic13">使用技巧</h3>
              <p class="use-skills">
                {{ detail.usageTips }}
              </p>
            </div>
          </div>
          <!-- 对抗技巧 -->
          <div class="panel brt">
            <div class="autom">
              <h3 class="tit1 ic14">对抗技巧</h3>
              <p class="use-skills">
                {{ detail.battleTips }}
              </p>
            </div>
          </div>
          <!-- 团战思路 -->
          <div class="panel brt">
            <div class="autom">
              <h3 class="tit1 ic15">团战思路</h3>
              <p class="use-skills">
                {{ detail.teamTips }}
              </p>
            </div>
          </div>
          <!-- 英雄关系 -->
          <div class="panel">
            <div class="autom">
              <h3 class="tit1 ic8">英雄关系</h3>
              <p class="tit2">最佳搭档</p>
              <ul class="rela-list" data-relatename="|" data-relatedesc="|">
                <li v-for="(partner, index) in detail.partners" :key="index">
                  <img :src="partner.avatar" class="rela-img" alt="英雄头像" />
                  <p class="rela-text">
                    {{ partner.description }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 攻略 -->
        <div
          class="content-list slide-item"
          style="position: absolute; top: 0px; left: 0px; visibility: hidden"
        >
          <ul class="raiders-list strategy-info"></ul>
          <div class="load-more">
            <a href="javascript:;" class="load-link">上拉加载更多</a>
          </div>
        </div>
      </div>
    </div>
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
      detail: {},
      curSkill: {
        cost: "",
        delay: "",
        description: "",
        icon: "",
        name: "",
        tips: "",
        _id: "",
        curIndex: 0,
      },
    };
  },
  methods: {
    async fetch() {
      const hash = window.location.hash.replace(/(#\/)?/, "");
      const res = await this.$http.get(`/${hash}`);
      this.detail = res.data;
    },
    showSkill(curIndex) {
      // 遍历技能数组
      this.detail.skills.forEach((skill, index) => {
        const imgEl = document.querySelector(`#skill-img-${index}`);
        if (index === curIndex) {
          // 若数组下标与图片下标匹配
          imgEl.className = "current"; // 设置技能图片选中态
          this.curSkill = skill; // 替换技能描述
        } else {
          imgEl.className = ""; // 清空选中态
        }
      });
    },
    async postTea() {
      // 获取文章id
      const hash = window.location.hash.replace(/(#\/heroes\/)?/, "");
      const teaData = {
        viewedid: hash,
        time: dayjs().tz("PRC"),
        type: "Hero",
      };
      await this.$http.post("/tea", teaData);
    },
  },
  async created() {
    await this.fetch();
    this.showSkill(0);
    this.postTea();
  },
};
</script>
<style scoped>
</style>
<style scoped>
@charset "gb2312";

/* CSS Document */

/* ---------- init ---------- */
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
hr,
button,
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  margin: 0;
  padding: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
  word-wrap: break-word;
}
body,
button,
input,
select,
textarea {
  font-family: "Helvetica Neue", Helvetica, STHeiTi, "\5FAE\8F6F\96C5\9ED1",
    sans-serif;
  font-size: 1rem;
  color: #000;
}
th {
  text-align: inherit;
}
ol,
ul {
  list-style: none;
}
fieldset,
img {
  border: 0;
  vertical-align: middle;
}
caption,
th {
  text-align: left;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: 500;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
ins,
a {
  color: #222;
  text-decoration: none;
}
a,
img {
  -webkit-touch-callout: none;
}
table {
  border-collapse: collapse;
}
i {
  font-style: normal;
}
* {
  padding: 0;
  margin: 0;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  content: "\20";
  display: block;
  height: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}
body {
  min-width: 350px;
  height: 100%;
  width: 100%;
  background: #f1f1f1;
}
img {
  width: 100%;
  display: block;
}
.clearfloat {
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.videoContline {
  width: 100%;
  height: 0.333rem;
  background: #d3d3d4;
}
.warp {
  position: static;
  width: 100%;
  background: #f1f1f1;
  padding-bottom: 3.125rem;
  overflow-x: hidden;
  margin-top: 45px;
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}
/*top*/
.video_list,
.video_search,
.mess_list,
.info_title-cont,
.info_cont,
.newSay_cont,
.info-list,
.pr-top,
.pr-a,
.pr-f {
  width: 25.83333rem;
  margin: 0 auto;
}
.home-top {
  background-color: #1a1a20;
  left: 0;
  top: 0;
  height: 0.9rem;
  width: 100%;
  z-index: 20;
  position: fixed;
  display: block;
  overflow: hidden;
}
.show-more-top .home-top {
  height: 2rem;
}
.home-top1 {
  background: url(../assets/images/index.png) no-repeat;
  background-size: 7.5rem;
  background-position: 0 -7.15rem;
  height: 0.9rem;
  width: 100%;
  display: block;
}
.logo_cont {
  position: absolute;
  width: 3rem;
  height: 0.6rem;
  top: 0.16rem;
  left: 0.34rem;
  padding-left: 0.8rem;
}
.logo_img {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  background-image: url(../assets/images/index.png);
  background-size: 7.5rem;
  background-position: 0 -6.16rem;
}
.logo_title h1 {
  font-size: 0.26rem;
  line-height: 0.34rem;
  color: #ffffff;
}
.logo_title p {
  font-size: 0.16rem;
  color: #666;
}
.home-top .download {
  position: absolute;
  width: 1.2rem;
  height: 0.48rem;
  top: 0.18rem;
  right: 0.32rem;
}
.home-top .download a {
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/index.png);
  background-size: 7.5rem;
  background-position: -1.18rem -6.18rem;
}
.home-top2 {
  position: relative;
  padding-left: 0.34rem;
  padding-top: 0.08rem;
  font-size: 0.24rem;
  color: #fff;
  line-height: 1.2;
}
.home-top2__links {
  position: absolute;
  top: 0.08rem;
  right: 0.32rem;
  text-align: right;
}
.home-top2__links a {
  color: #fff;
}

/*页脚*/
.home_bottom {
  background: #db9e3f;
  height: 0.84rem;
  width: 100%;
  background-size: 100% auto;
  font-size: 0;
  z-index: 10;
  margin-top: 0.9rem;
}
.show-more-top .home_bottom {
  margin-top: 2rem;
}
.home_bottom a {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;
  height: 100%;
  display: inline-block;
  color: #fff;
  font-size: 0.26rem;
  text-indent: 0;
}
.home_bottom ul {
  height: 100%;
}
.home_bottom ul li {
  width: 25%;
  height: 0.84rem;
  float: left;
  line-height: 0.84rem;
}
.home_bottom .currentL a:after {
  left: 50%;
  margin-left: -0.25rem;
}
.home_bottom li:nth-child(2).currentL a:after,
.home_bottom li:nth-child(3).currentL a:after {
  width: 1rem;
  margin-left: -0.5rem;
}
.currentL {
  background: none;
}
.currentL a:after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 0.5rem;
  height: 3px;
  background: #fff;
  left: 0;
  top: 0.6rem;
}
.home_bottom.fix-bottom {
  position: fixed;
  top: 0px;
  transition: transform 0.3s ease-in-out;
  transform: translateY(45px);
  z-index: 9;
}

#main-nav a {
  color: #fff;
}
#main-nav a:visited {
  color: #fff;
}

.mask {
  background: #000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 50;
  display: none;
}
.mask-box {
  width: 100%;
  height: 252px;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -119px;
}
.mask-pic {
  width: 154px;
  height: 216px;
  margin: 0 auto;
  text-align: center;
}
.mask p {
  font-size: 20px;
  color: #a39772;
  overflow: hidden;
  text-align: center;
}
.mask p em {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border: 2px solid #a39772;
  display: inline-block;
  text-align: center;
  line-height: 25px;
}
.mask p span {
  width: 350px;
  display: inline-block;
  text-align: center;
  height: 25px;
  line-height: 25px;
  padding-left: 10px;
}
.mask i {
  width: 154px;
  height: 216px;
  background: url(../assets/images/index.png) no-repeat;
  background-size: 750px;
  background-position: -566px -454px;
  display: block;
  margin: 0 auto;
  -webkit-animation: maskAni 1.5s ease infinite alternate;
  animation: maskAni 1.5s ease infinite alternate;
}
@-webkit-keyframes maskAni {
  0% {
    -webkit-transform: rotate(-90deg);
  }
  30% {
    -webkit-transform: rotate(-90deg);
  }
  70% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}

.slide {
  position: relative;
  overflow: hidden;
}
.slide .controller {
  width: 100%;
  text-align: right;
  overflow: hidden;
  position: absolute;
  top: 2.7rem;
  right: 0.12rem;
}
.slide ul.controller li {
  width: 0.17rem;
  height: 0.17rem;
  display: inline-block;
  margin-right: 0.2rem;
  line-height: 999px;
  overflow: hidden;
  border-radius: 2px;
  background: #fff;
}
.slide ul.controller li.current {
  background: #4b67af;
}

.slide-container .slide-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 0.2rem;
}
.slide-container .slide-content {
  width: 100%;
  height: 100%;
  margin: 0.3rem auto 0;
}
.slide-container .slide-nav {
  overflow: hidden;
}
.slide-container .slide-nav a {
  position: relative;
  font-size: 0.26rem;
  color: #343440;
  display: inline-block;
  width: 100%;
}
.slide-container .slide-nav .currentL a {
  color: #db9e3f;
}
.slide-container .slide-nav .currentL a:after {
  background: #db9e3f;
  top: auto;
  bottom: -0.02rem;
}
.slide-container .slide-nav li {
  float: left;
  line-height: 0.46rem;
}
.slide-container .slide-nav li:last-child {
  margin-right: 0;
}
.slide-container .slide-item {
  width: 100%;
  overflow: hidden;
  float: left;
}
.slide .controller {
  width: 100%;
  text-align: right;
  overflow: hidden;
  position: absolute;
  top: 2.7rem;
  right: 0.12rem;
}
.slide ul.controller li {
  width: 0.17rem;
  height: 0.17rem;
  display: inline-block;
  margin-right: 0.2rem;
  line-height: 999px;
  overflow: hidden;
  border-radius: 2px;
  background: #fff;
}
.slide ul.controller li.current {
  background: #4b67af;
}

.slide-nav .now {
  color: #db9e3f;
}
.slide-nav .now:after {
  background: #db9e3f;
  top: auto;
  bottom: -0.02rem;
}

iframe {
  display: none !important;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: content-box;
}

html {
  font-size: 50px;
}

img {
  border: 0;
  vertical-align: middle;
}

ul,
ol,
dl {
  list-style: none;
}

html,
body {
  height: 100%;
  background: #fff;
}

body {
  font-size: 0.12rem;
  font-family: arial, "Microsoft YaHei", simsun;
}

.ht,
.raiders-vdbtn .vdbtn-left span {
  overflow: hidden;
  text-indent: -9999rem;
}

.hide {
  width: 0;
  height: 0;
  display: block;
  text-indent: -9999rem;
  overflow: hidden;
}

.pa {
  position: absolute;
}

.pr {
  position: relative;
}

i {
  display: block;
  font-style: normal;
}

.l {
  float: left;
}

.r {
  float: right;
}

.c:after,
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.c,
.clearfix {
  zoom: 1;
}

a {
  text-decoration: none;
}

.header-hero {
  width: 100%;
  height: 3.82rem;
  position: relative;
}

.header-hero:after {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../assets/images/bt.png);
  background-size: contain;
}

.header-hero img {
  width: 100%;
  height: 100%;
}

.header-hero .hero-attribute {
  position: absolute;
  bottom: 0;
  left: 0.3rem;
  height: 1.78rem;
  width: 6.92rem;
  z-index: 1;
}

@-webkit-keyframes txtshow {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes txtshow {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.header-hero .hero-attribute p {
  padding-bottom: 0.11rem;
  color: #fff;
  -webkit-animation: txtshow 0.5s;
  animation: txtshow 1s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  opacity: 0;
}

.header-hero .hero-attribute .hero-name {
  animation-delay: 0.2s;
}

.header-hero .hero-attribute .hero-location {
  animation-delay: 0.4s;
}

.header-hero .hero-title,
.header-hero .hero-location {
  box-sizing: content-box;
  height: 0.22rem;
  line-height: 0.22rem;
  font-size: 0.22rem;
}

.header-hero .hero-name {
  height: 0.34rem;
  line-height: 0.34rem;
  font-size: 0.34rem;
  font-weight: bold;
}

.header-hero .cover-list {
  float: left;
}

@-webkit-keyframes lishow {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes lishow {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.header-hero .cover-list li {
  float: right;
  width: 0.81rem;
  margin-right: 0.34rem;
  color: #ffffff;
  font-size: 0.24rem;
  line-height: 0.24rem;
  height: 0.24rem;
  -webkit-animation: lishow 0.5s 0.5s;
  animation: lishow 0.5s 0.5s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  opacity: 0;
}

.header-hero .cover-list li:nth-child(1) {
  -webkit-animation-delay: 1.1s;
  animation-delay: 1.1s;
}

.header-hero .cover-list li:nth-child(2) {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}

.header-hero .cover-list li:nth-child(3) {
  -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s;
}

.header-hero .cover-list li span {
  display: inline-block;
  width: 0.37rem;
  height: 0.37rem;
  vertical-align: middle;
  margin: -0.07rem -0.1rem 0 -1rem;
  transform: scale(0.66);
  float: right;
}

.header-hero .hero-skin {
  position: relative;
  float: right;
  font-size: 0.22rem;
  color: #b6afa8;
  margin-top: -4px;
  padding-right: 0.2rem;
}

.header-hero .hero-skin:after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 10px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: -2px;
  background: url(../assets/images/skin-link.png) no-repeat;
  background-size: contain;
}

.header-hero .hero-skin span {
  padding-right: 0.1rem;
}

.content-hero {
  border-top: 1px solid #d4d9de;
}

.hero-nav {
  display: flex;
  width: 7.02rem;
  margin: 0 auto;
  padding: 0.24rem 0 0.15rem 0;
  border-bottom: 1px solid #d4d9de;
}

.content-hero .hero-nav li {
  flex: 1;
  text-align: center;
  font-size: 0.26rem;
  height: 0.34rem;
  line-height: 0.34rem;
  color: #000;
  margin: 0 0.48rem;
  float: none;
}

.content-hero .hero-nav li:first-child {
  margin-left: 0;
}

.content-hero .hero-nav .current a {
  width: auto;
  color: #d59b40;
  border-bottom: 0.04rem solid #d59b40;
}

/* .hero-video {
  padding: 0.18rem 0 0.26rem 0;
  width: 7.02rem;
  margin: 0 auto;
}

.hero-video a {
  position: relative;
  height: 0.74rem;
  line-height: 0.74rem;
  color: #343440;
  font-size: 0.26rem;
  display: inline-block;
  background-color: #fcfcfc;
  width: 3.4rem;
  border-radius: 0.1rem;
  border: 1px solid #eceef0;
  text-align: center;
  text-indent: 0.6rem;
}

.hero-video .video-play {
  margin-right: 0.068rem;
}

.hero-video .video-play:before {
  content: "";
  position: absolute;
  left: 0.65rem;
  top: 50%;
  margin-top: -0.2rem;
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url(../assets/images/icon_06.png)
    no-repeat;
  background-size: contain;
}

.hero-video .voice-play:before {
  content: "";
  position: absolute;
  left: 0.6rem;
  top: 50%;
  margin-top: -0.19rem;
  display: inline-block;
  width: 0.38rem;
  height: 0.38rem;
  width: 2.05rem;
  background: url(../assets/images/icon_07.png)
    no-repeat;
  background-size: contain;
  background-size: 0.38rem 0.38rem;
} */

.tit1 {
  font-size: 0.32rem;
  font-weight: bold;
  line-height: 0.34rem;
  height: 0.34rem;
  padding-left: 0.39rem;
  padding-bottom: 0.25rem;
}

.ic8 {
  background: url(../assets/images/icon_08.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic9 {
  background: url(../assets/images/icon_05.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic10 {
  background: url(../assets/images/icon_10.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic11 {
  background: url(../assets/images/icon_11.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic12 {
  background: url(../assets/images/icon_12.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic13 {
  background: url(../assets/images/icon_13.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic14 {
  background: url(../assets/images/icon_14.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic15 {
  background: url(../assets/images/icon_15.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.ic16 {
  background: url(../assets/images/icon_16.png) no-repeat 0 0.02rem;
  background-size: 0.26rem 0.26rem;
}

.tit2 {
  color: #343440;
  font-size: 0.3rem;
  padding-bottom: 0.25rem;
  line-height: 0.28rem;
  height: 0.28rem;
}

.brn {
  border-bottom: none !important;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}

.brf {
  border-bottom: 0.19rem solid #ededed !important;
}

.brtn {
  border-top: 0 !important;
}

.brbn {
  border-bottom: 0 !important;
}

.more-btn {
  display: block;
  width: 100%;
  height: 0.67rem;
  background-color: #f4f4f4;
  line-height: 0.67rem;
  text-align: center;
  color: #7a7a80;
  font-size: 0.24rem;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #d4d9de;
  margin-top: 0.2rem;
}

.more-btn span {
  color: #d59b40;
}

.autom {
  width: 7.02rem;
  margin: 0.3rem auto 0 auto;
  overflow: hidden;
}

.panel {
  border-top: 0.22rem solid #ededed;
  border-bottom: 1px solid #d4d9de;
}

.rela-list {
  margin-bottom: 0.2rem;
}

.rela-list li {
  padding-bottom: 0.3rem;
}

.rela-list li:after,
.rela-list .clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.rela-list li,
.rela-list .clearfix {
  zoom: 1;
}

.rela-list .rela-img {
  width: 0.96rem;
  height: 0.96rem;
  display: block;
  border-radius: 3px;
  float: left;
}

.rela-list .rela-text {
  float: right;
  color: #343440;
  font-size: 0.26rem;
  line-height: 0.4rem;
  width: 5.86rem;
  padding-top: 0.05rem;
}

.hero-story {
  height: 3rem;
}

.hero-story p {
  line-height: 0.42rem;
  color: #343440;
  font-size: 0.26rem;
  text-indent: 2rem;
}

.rd-video-info {
  padding-top: 0.4rem;
}

.rd-video-tm {
  padding-left: 0.29rem;
  background: url(../assets/images/video-tm.png) no-repeat;
  background-size: 0.2rem 0.2rem;
  float: left;
}

.rd-video-spr {
  display: block;
  line-height: 0.2rem;
  height: 0.2rem;
  color: #7a7a80;
  font-size: 0.2rem;
}

.rd-video-fre {
  padding-left: 0.31rem;
  background: url(../assets/images/video-fre.png) no-repeat;
  background-size: 0.24rem 0.18rem;
  margin-right: 0.31rem;
  float: left;
}

.rd-video-day {
  float: right;
}

.raiders-list {
  width: 7.02rem;
  margin: 0 auto;
}

.raiders-list li {
  padding: 0.23rem 0;
  border-bottom: 1px solid #d4d9de;
}

.raiders-list li:last-child {
  border-bottom: none;
}

.raiders-vdbtn {
  position: relative;
  display: block;
}

.raiders-vdbtn.rec-item:before {
  content: "";
  display: block;
  width: 0.52rem;
  height: 0.26rem;
  background: url(../assets/images/rec-icon.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 0.05rem;
  left: 0.05rem;
  z-index: 1;
}

.raiders-vdbtn .vdbtn-left {
  position: relative;
  float: left;
  width: 2.32rem;
  height: 1.29rem;
}

.raiders-vdbtn .vdbtn-left img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.raiders-vdbtn .vdbtn-left span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/images/video-img.png) no-repeat 0.83rem 0.33rem;
  background-size: 0.64rem 0.64rem;
}

.raiders-vdbtn .vdbtn-left em {
  display: block;
  text-align: center;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.42rem;
  height: 0.19rem;
  background-color: #17c9ef;
  color: #fff;
  font-size: 0.14rem;
  line-height: 0.19rem;
  font-style: normal;
}

.raiders-vdbtn .vdbtn-right {
  float: right;
  width: 4.4rem;
}

.raiders-vdbtn .vdbtn-right p {
  color: #343440;
  line-height: 0.33rem;
  font-size: 0.26rem;
  height: 0.66rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

.content-skin {
  position: relative;
  width: 100%;
  padding-top: 45px;
  margin-top: 0.1rem;
}

.content-skin .skin-list {
  width: 7.27rem;
  height: 11.82rem;
}

.content-skin .skin-box {
  width: 7.27rem;
  margin: 0 auto;
}

.content-skin .skin-box li {
  width: 7.27rem;
  height: 11.82rem;
  position: relative;
}

.content-skin .skin-video {
  height: 10.71rem;
  background-color: #161725;
}

.content-skin .skin_name {
  width: 100%;
  height: 0.26rem;
  line-height: 0.26rem;
  color: #343440;
  font-size: 0.26rem;
  text-align: center;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  margin-left: -50%;
  padding-top: 0.7rem;
  z-index: 9;
}

.content-skin .controller {
  position: absolute;
  bottom: 0.05rem;
  left: 50%;
  margin-left: -50%;
  z-index: 10;
  font-size: 0;
  text-align: center;
  height: 0.24rem;
  width: 100%;
}

.content-skin .controller li {
  display: inline-block;
  width: 0.2rem;
  height: 0.1rem;
  background-color: #bababa;
  margin: 0 0.05rem;
  border-radius: 0.05rem;
  transition: width 0.5s;
  -webkit-transition: width 0.5s;
  text-indent: -9999rem;
}

.content-skin .controller li.current {
  width: 0.3rem;
  background-color: #161725;
}

.content-skin .skin_btn {
  font-size: 0.5rem;
  font-weight: bold;
  position: absolute;
  top: 3.2rem;
  width: 0.22rem;
  height: 0.38rem;
}

.content-skin .prev_btn {
  left: 0.2rem;
  background-position: -4.56rem -0.48rem;
}

.content-skin .next_btn {
  right: 0.2rem;
  background-position: -5.37rem -0.86rem;
}

.brt {
  border-top: 0.19rem solid #ededed;
}

.ptn {
  padding: 0 0 0.2rem 0 !important;
}

.brm {
  border-bottom: 0.19rem solid #ededed;
}

.prompt {
  padding: 0.26rem 0 0.42rem 0;
  color: #7a7a80;
  font-size: 0.26rem;
  line-height: 0.4rem;
}

.skills-build {
  border-bottom: 1px solid #d4d9de;
  margin-bottom: 0.26rem;
}

.skills-build .build-list {
  display: flex;
  text-align: center;
}

.skills-build .build-list li {
  flex: 1;
  text-align: center;
}

.skills-build .build-list li span {
  display: inline-block;
  flex: 1;
}

.skills-build .build-list li .build-img,
.skills-build .build-list li .build-img img {
  width: 0.93rem;
  height: 0.93rem;
  border-radius: 0.46rem;
}

.skills-build .build-list li .build-name {
  width: 1.1rem;
  color: #343440;
  font-size: 0.18rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 0.26rem;
  height: 0.26rem;
  margin-top: 0.1rem;
}

.rune-list {
  overflow: hidden;
}

.rune-cont {
  padding-bottom: 0.27rem;
  float: left;
  width: 33.3333%;
}

.rune-cont dt,
.rune-cont img {
  width: 0.67rem;
  height: 0.79rem;
  float: left;
}

.rune-cont dd {
  float: left;
  margin-left: 9%;
}

.rune-cont .rp1 {
  color: #343440;
  font-size: 0.3rem;
  line-height: 0.3rem;
  height: 0.3rem;
  padding: 0.05rem 0 0.05rem 0;
}

.rune-cont .rp2 {
  color: #7a7a80;
  font-size: 0.26rem;
  line-height: 0.4rem;
}

.rune-cont .rp2 span {
  padding-right: 0.37rem;
}

.use-skills {
  color: #343440;
  font-size: 0.26rem;
  line-height: 0.4rem;
  padding-bottom: 0.11rem;
}

.plus-tab {
  width: 100%;
  overflow: hidden;
  height: 1.3rem;
  -webkit-transition: -webkit-transform ease-in-out 0.6s;
  transition: -webkit-transform ease-in-out 0.6s;
  transition: transform ease-in-out 0.6s;
  transition: transform ease-in-out 0.6s, -webkit-transform ease-in-out 0.6s;
  display: flex;
  display: -webkit-flex;
}

.plus-tab li {
  float: left;
  width: 1.2rem;
  height: 1.2rem;
  /*border: .05rem solid #fff;*/
  border-radius: 0.56rem;
  display: inline-block;
  margin: 0 0.12rem;
  flex: 1;
}

.plus-tab li img {
  width: 1.2rem;
  height: 1.2rem;
  border: 0.05rem solid transparent;
  border-radius: 0.58rem;
  margin: 0 auto;
}

.plus-tab li.current img {
  border: 0.05rem solid #d59b40;
  border-radius: 0.58rem;
}

.plus-control {
  display: none;
}

.plus-content {
  padding-top: 0.4rem;
}

.plus-content li {
  display: none;
}

.plus-content .plus-box span {
  display: block;
}

.plus-content .plus-box .plus-name {
  float: left;
  color: #343440;
  font-size: 0.3rem;
  font-weight: bold;
  width: 1.5rem;
}

.plus-content .plus-box .plus-value {
  float: right;
  font-size: 0.23rem;
  color: #7a7a80;
  line-height: 0.3rem;
  width: 5.44rem;
  padding-top: 0.07rem;
}

.plus-content .plus-int {
  line-height: 0.4rem;
  color: #343440;
  font-size: 0.26rem;
  padding: 0.38rem 0 0.2rem 0;
  /* border-bottom: 1px solid #d4d9de; */
}

.plus-spr {
  position: absolute;
  height: 1.15rem;
  width: 0.5rem;
  top: 0;
}

.plus-prev {
  background: url(../assets/images/plus-prev.png) no-repeat right 0.1rem;
  background-size: 0.28rem 0.97rem;
  left: -0.24rem;
  display: none;
}

.plus-next {
  background: url(../assets/images/plus-next.png) no-repeat left 0.1rem;
  background-size: 0.28rem 0.97rem;
  right: -0.24rem;
}

.plus-osal {
  color: #343440;
}

.plus-osal .sk1 {
  padding-left: 0.16rem;
}

.plus-osal .sk2 {
  padding-left: 0.8rem;
}

.plus-osal .osal-box {
  text-align: center;
  width: 1.19rem;
}

.plus-osal .osal-box:last-child {
  float: right;
}

.plus-osal .osal-box img {
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  border-radius: 0.58rem;
}

.plus-osal .osal-p1,
.plus-osal .osal-suner p {
  display: block;
  font-size: 0.3rem;
  line-height: 0.3rem;
  height: 0.3rem;
  padding-bottom: 0.25rem;
}

.plus-osal .osal-p2 {
  display: block;
  color: #343440;
  font-size: 0.18rem;
  line-height: 0.18rem;
  height: 0.18rem;
  padding: 0.2rem 0 0.25rem 0;
}

.plus-osal .osal-suner {
  width: 2.58rem;
  text-align: center;
  padding-left: 0.82rem;
}

.skin-list {
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.skin-list li {
  float: left;
}

.skin-list li i {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 auto;
}

.header-hero .cover-list li {
  margin-right: 0.2rem;
}

.load-more {
  background: #f4f4f4;
  height: 0.7rem;
  margin-top: -1px;
  border-bottom: 1px solid #d4d9de;
}

.load-more a {
  color: #7a7a80;
  font-size: 0.24rem;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 0.7rem;
}

.slide-container {
  padding-bottom: 0;
}

.slide-container .slide-content {
  margin: 0;
}

.cover-list .hero-attrsp {
  background: url(../assets/images/hero-attrsp.png) no-repeat;
  background-size: 4rem;
}

.cover-list .hero-attr1-1 {
  background-position: 0 0;
}

.cover-list .hero-attr1-2 {
  background-position: 0 -0.41rem;
}

.cover-list .hero-attr1-3 {
  background-position: 0 -0.82rem;
}

.cover-list .hero-attr1-4 {
  background-position: 0 -1.23rem;
}

.cover-list .hero-attr1-5 {
  background-position: 0 -1.64rem;
}

.cover-list .hero-attr1-6 {
  background-position: 0 -2.05rem;
}

.cover-list .hero-attr1-7 {
  background-position: 0 -2.46rem;
}

.cover-list .hero-attr1-8 {
  background-position: 0 -2.87rem;
}

.cover-list .hero-attr1-9 {
  background-position: 0 -3.28rem;
}

.cover-list .hero-attr1-10 {
  background-position: 0 -3.69rem;
}

.cover-list .hero-attr2-1 {
  background-position: -0.41rem 0;
}

.cover-list .hero-attr2-2 {
  background-position: -0.41rem -0.41rem;
}

.cover-list .hero-attr2-3 {
  background-position: -0.41rem -0.8rem;
}

.cover-list .hero-attr2-4 {
  background-position: -0.41rem -1.23rem;
}

.cover-list .hero-attr2-5 {
  background-position: -0.41rem -1.64rem;
}

.cover-list .hero-attr2-6 {
  background-position: -0.41rem -2.05rem;
}

.cover-list .hero-attr2-7 {
  background-position: -0.41rem -2.46rem;
}

.cover-list .hero-attr2-8 {
  background-position: -0.41rem -2.87rem;
}

.cover-list .hero-attr2-9 {
  background-position: -0.41rem -3.28rem;
}

.cover-list .hero-attr2-10 {
  background-position: -0.41rem -3.69rem;
}

.cover-list .hero-attr3-1 {
  background-position: -0.82rem 0;
}

.cover-list .hero-attr3-2 {
  background-position: -0.82rem -0.41rem;
}

.cover-list .hero-attr3-3 {
  background-position: -0.82rem -0.8rem;
}

.cover-list .hero-attr3-4 {
  background-position: -0.82rem -1.23rem;
}

.cover-list .hero-attr3-5 {
  background-position: -0.82rem -1.64rem;
}

.cover-list .hero-attr3-6 {
  background-position: -0.82rem -2.05rem;
}

.cover-list .hero-attr3-7 {
  background-position: -0.82rem -2.46rem;
}

.cover-list .hero-attr3-8 {
  background-position: -0.82rem -2.87rem;
}

.cover-list .hero-attr3-9 {
  background-position: -0.82rem -3.28rem;
}

.cover-list .hero-attr3-10 {
  background-position: -0.82rem -3.69rem;
}

.cover-list .hero-attr4-1 {
  background-position: -1.23rem 0;
}

.cover-list .hero-attr4-2 {
  background-position: -1.23rem -0.41rem;
}

.cover-list .hero-attr4-3 {
  background-position: -1.23rem -0.8rem;
}

.cover-list .hero-attr4-4 {
  background-position: -1.23rem -1.23rem;
}

.cover-list .hero-attr4-5 {
  background-position: -1.23rem -1.64rem;
}

.cover-list .hero-attr4-6 {
  background-position: -1.23rem -2.05rem;
}

.cover-list .hero-attr4-7 {
  background-position: -1.23rem -2.46rem;
}

.cover-list .hero-attr4-8 {
  background-position: -1.23rem -2.87rem;
}

.cover-list .hero-attr4-9 {
  background-position: -1.23rem -3.28rem;
}

.cover-list .hero-attr4-10 {
  background-position: -1.23rem -3.69rem;
}

.content-list .panel:last-child {
  padding-bottom: 0.4rem;
}

.content-list:first-child .panel:last-child {
  padding-bottom: 0;
}

.slide-container .slide-nav li:first-child,
.slide-container .slide-nav li:last-child {
  margin: 0 0.48rem;
}

.header-hero .hero-title {
  padding-top: 0.1rem;
}

.rune-cont dd p:nth-child(3),
.rune-cont dd p:nth-child(4),
.rune-cont dd p:nth-child(5) {
  font-size: 0.18rem;
}

.content-list {
  padding-bottom: 0.1rem;
}

.home-top .download a {
  background: none;
  font-size: 0.4rem;
  color: #fff;
  text-align: right;
}

.home-top .download span {
  font-size: 0.22rem;
  float: left;
  line-height: 0.46rem;
}

.logo_title h1 {
  line-height: 0.6rem;
}

.home-top .download {
  top: 0.24rem;
  width: 1.3rem;
}

#canvas-container {
  width: 100%;
  height: 3.4453rem;
}

.hero-share {
  display: none;
  width: 0.82rem;
  height: 0.82rem;
  position: fixed;
  right: 0.2rem;
  top: 10rem;
  background: url(../assets/images/share-icon.png) no-repeat;
  background-size: contain;
}

.pop-on {
  width: 100%;
  box-sizing: border-box;
}

.share-guide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: none;
  z-index: 20;
}

.share-guide img {
  width: 100%;
}

.pop-on .share-guide {
  display: block;
}
</style>

