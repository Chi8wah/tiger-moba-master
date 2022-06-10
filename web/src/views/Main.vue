<template>
  <div>
    <!-- topbar -->
    <div class="topbar bg-black d-flex ai-center">
      <img src="../assets/logo.png" alt="Logo" />
      <div class="px-2 flex-1">
        <div class="topbar-text text-white" style="margin-bottom: 0.15rem">
          王者荣耀
        </div>
        <div class="topbar-text text-grey-1 text-xs">团队成就更多</div>
      </div>

      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <!-- nav -->
    <div class="bg-primary topnav">
      <div class="d-flex jc-around nav nav-inverse">
        <div class="nav-item active">
          <router-link tag="div" to="/" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/gonglue">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <!-- 路由 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    (function (doc, win) {
      var docEl = doc.documentElement, //根元素html
        //判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。

        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
          var clientWidth = docEl.clientWidth;

          if (!clientWidth) return;

          //把document的fontSize大小设置成跟窗口成一定比例的大小，从而实现响应式效果。

          let result = 40 * (clientWidth / 320);

          result = result > 46.625 ? result : 46.625;

          docEl.style.fontSize = result + "px";
        };

      //alert(docEl)

      if (!doc.addEventListener) return;

      win.addEventListener(resizeEvt, recalc, false); //addEventListener事件方法接受三个参数：第一个是事件名称比如点击事件onclick，第二个是要执行的函数，第三个是布尔值

      doc.addEventListener("DOMContentLoaded", recalc, false); //绑定浏览器缩放与加载时间
    })(document, window);

    //alert(document.documentElement.clientWidth/320)
  },
};
</script>
