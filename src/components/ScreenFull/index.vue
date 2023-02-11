<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <el-tooltip class="item" effect="dark" content="放大镜" placement="bottom">
      <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="handleFullScreen" />
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ScreenFull',

  data() {
    return {

    }
  },

  methods: {
    // 全屏事件
    handleFullScreen() {
      const element = document.documentElement
      // 判断是否已经是全屏
      // document.fullscreenElement == null   代表现在不是全屏
      // document.exitFullscreen() 方法用于让当前文档退出全屏模式
      // 如果是全屏，退出
      if (document.fullscreenElement !== null) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else { // 否则，进入全屏
        // element.requestFullscreen  退出全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
    }
  }

}
</script>

  <style>

  </style>

