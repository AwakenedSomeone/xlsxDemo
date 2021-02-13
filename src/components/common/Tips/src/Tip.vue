<template>
    <div class="posall zindex txc tip-layer" v-if="visible">
        <div class="tipbox disi" v-if="isTip">
           {{message}}
        </div>
        <div class="tipbox disi tipbox-succ" v-else>
           <img src="./imgs/success.png" class="vtm mgr10">
           提交成功
        </div>
    </div>
</template>
<style scoped lang="scss">
.tip-layer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 4000;
}
.tipbox {
  margin-top: 30%;
  width: auto;
  font-size: 14px;
  padding: 8px 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  border-radius: 6px;
}
.tipbox-succ{padding: 10px 25px;background-color: rgba(0, 0, 0, 0.5);font-size: 16px;}

</style>


<script>
export default {
  data() {
    return {
      visible: false,
      message: "提交成功！",
      isTip:true
    };
  },
  mounted() {
  },
  methods: {
      doClose () {
          if (this.visible) {
              this.$el.parentNode.removeChild(this.$el);
          }
          
      }
  }
};
</script>
