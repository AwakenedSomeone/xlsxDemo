<template>
  <p class="cusp f16 disi" @click="back"><i class="el-icon-arrow-left fwb f20 vtm"></i> 返回</p>
</template>
<script>
export default {
  props: {
    isHide: {
      type: Boolean,
      default: false
    },
    func: {
      type: Function,
      default: null
    }
  },
  methods: {
    back() {
      // 如果isHide为true表示点击返回时不需要返回上一层页面，而是隐藏——（通过广播传递事件）
      if (this.isHide) {
       this.func&&this.func();
      } else {
        this.common.back(this);
      }
    }
  }
};
</script>

