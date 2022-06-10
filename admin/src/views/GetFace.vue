<template>
  <div class="getFaceCtn">
    <video
      muted
      width="400px"
      height="300px"
      autoplay="autoplay"
      id="video"
      class="getFaceVideo"
    ></video>
    <canvas
      id="canvas4"
      width="400px"
      height="300px"
      class="getFaceCanvas"
    ></canvas>
    <div class="getFaceBtnCtn">
      <!-- <button @click="getMedia">getMedia</button> -->
      <el-button @click="drawVideoAtCanvas">{{ "打开/关闭摄像头" }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["onFaceLogin"],
  data() {
    return {
      model: {},
      video: null,
      audio: null,
      audioType: null,
      canvas4: null,
      context4: null,
      shouldDrawCanvas: null,
      isVideoShow: false,
    };
  },
  methods: {
    getMedia: function () {
      if (this.shouldVideoShow) {
        this.shouldVideoShow = false;
        this.stopVideo();
        this.video.style = "display: none";
        return;
      }
      this.video.style = "display: unset";
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
          },
          this.successFunc,
          this.errorFunc
        ); //success是获取成功的回调函数
      } else {
        alert(
          "Native device media streaming (getUserMedia) not supported in this browser."
        );
      }
    },
    successFunc: function (stream) {
      //alert('Succeed to get media!');
      if (this.video.mozSrcObject !== undefined) {
        //Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持
        this.video.mozSrcObject = stream;
      } else {
        this.video.srcObject = stream;
        // video.src = window.URL && window.URL.createObjectURL(stream) || stream;
      }
      this.shouldVideoShow = true;
    },
    errorFunc: function (e) {
      alert("Error！" + e);
    },
    // 将视频帧绘制到Canvas对象上,Canvas每16ms切换帧，形成肉眼视频效果
    drawVideoAtCanvas: function () {
      this.getMedia();
      if (!this.shouldDrawCanvas) {
        this.canvas4.style = "display: unset";
        this.shouldDrawCanvas = window.setInterval(() => {
          this.context4.drawImage(this.video, 0, 0, 400, 300);
        }, 16);
      } else {
        window.clearInterval(this.shouldDrawCanvas);
        this.shouldDrawCanvas = null;
        this.canvas4.style = "display: none";
      }
    },
    //拍照
    getPhoto: function () {
      this.context4.drawImage(this.video, 0, 0, 400, 300); //将video对象内指定的区域捕捉绘制到画布上指定的区域，实现拍照。
      var new_img = document.createElement("img");
      new_img.setAttribute("crossOrigin", "anonymous");
      new_img.src = this.canvas4.toDataURL("image/jpeg"); //图片转为base64格式
      const result = new_img.src.replace(/^data:image\/\w+;base64,/, "");
      return result;
    },
    stopVideo: function () {
      let srcObj;
      if (this.video.mozSrcObject !== undefined) {
        //Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持
        srcObj = this.video.mozSrcObject;
      } else {
        srcObj = this.video.srcObject;
        // video.src = window.URL && window.URL.createObjectURL(stream) || stream;
      }

      srcObj &&
        srcObj.getTracks().forEach((track) => {
          track.stop();
          srcObj.removeTrack(track);
        });
    },
  },
  mounted() {
    this.video = document.querySelector("#video");
    this.canvas4 = document.getElementById("canvas4");
    // this.canvas4.style = "display: none";
    this.context4 = this.canvas4.getContext("2d");
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    window.URL =
      window.URL || window.webkitURL || window.mozURL || window.msURL;
  },
  // vue 2.0 使用 beforeDestroy, vue 3.0 使用 beforeUnmount
  beforeDestroy() {
    this.stopVideo();
  },
};
</script>

<style scoped>
.getFaceCtn {
  position: relative;
  margin: 22px auto 0 auto;
  width: 400px;
  height: 300px;
  background: rgba(0, 0, 0, 0.1);
}
.getFaceVideo {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.getFaceCanvas {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}
.getFaceBtnCtn {
  z-index: 3;
  position: absolute;
  top: 0;
}
</style>