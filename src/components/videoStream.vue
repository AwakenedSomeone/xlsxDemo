<template>
    <div class="video-box" v-loading="loading">
        <video class="demo-video" ref="player" muted  @dblclick="fullScreen"></video>
    </div>
</template>
<script>
import flvjs from 'flv.js'
export default {
  props: {
    // rtsp: {
    //   type: String,
    //   default: ''
    // },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      // id: '1',
      rtsp: '10.128.9.74:554/Streaming/Channels/101',
      player: null,
      loading: true
    }
  },
  watch: {
    rtsp: {
      handler: function (val) {
        if (val) {
          if (this.player) {
            this.player.unload()
            this.player.destroy()
            this.player = null
            this.loading = true
          }
          this.$nextTick(() => {
            this.playVideo()
          })
        }
      },
      immediate: true
    }
  },
  created () {
    this.checkPageOnshow()
  },
  methods: {
    checkPageOnshow () {
      let state, visibilityChange
      if (typeof document.hidden !== 'undefined') {
        visibilityChange = 'visibilitychange'
        state = 'visibilityState'
      } else if (typeof document.mozHidden !== 'undefined') {
        visibilityChange = 'mozvisibilitychange'
        state = 'mozVisibilityState'
      } else if (typeof document.msHidden !== 'undefined') {
        visibilityChange = 'msvisibilitychange'
        state = 'msVisibilityState'
      } else if (typeof document.webkitHidden !== 'undefined') {
        visibilityChange = 'webkitvisibilitychange'
        state = 'webkitVisibilityState'
      }

      // 添加监听器，在title里显示状态变化
      document.addEventListener(visibilityChange, () => {
        if (document[state] === 'visible') {
          if (this.player) {
            this.player.unload()
            this.player.destroy()
            this.player = null
          }
          this.loading = true
          this.playVideo()
        } else {
          this.player.unload()
          this.player.destroy()
          this.player = null
        }
      }, false)
    },
    fullScreen () {
      if (this.$refs.player.requestFullScreen) {
        this.$refs.player.requestFullScreen()
      } else if (this.$refs.player.mozRequestFullScreen) {
        this.$refs.player.mozRequestFullScreen()
      } else if (this.$refs.player.webkitRequestFullScreen) {
        this.$refs.player.webkitRequestFullScreen()
      }
    },
    playVideo () {
      const time1 = new Date().getTime()
      if (flvjs.isSupported()) {
        let video = this.$refs.player
        if (video) {
          this.player = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: `ws://localhost:8888/rtsp/${this.id}/?url=${this.rtsp}`
            // url: `ws://${location.host}/streamWs/rtsp/${this.id}/?url=${this.rtsp}`
          })
          this.player.attachMediaElement(video)
          try {
            this.player.load()
            this.player.play().then(() => {
              console.log(new Date().getTime() - time1)
              this.loading = false
            })
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.unload()
      this.player.destroy()
      this.player = null
    }
  }
}
</script>
<style lang="scss">
.video-box {
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  //播放按钮
  video::-webkit-media-controls-play-button {
      display: none;
  }
  video::-webkit-media-controls-current-time-display {
    display: none;
  }
  video::-webkit-media-controls-timeline {
    display: none;
  }
}
</style>
