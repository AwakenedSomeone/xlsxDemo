<template>
    <div>
        <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
          <div class="showImg posa">
            <img class="bigImg" :src="imgList[num].url?imgList[num].url:imgList[num]">
            <div class="prev cusp posa txc" @click.stop="prev">
            <img src="./imgs/prev_btn.png">
          </div>
            <div class="next cusp posa txc" @click.stop="next">
            <img src="./imgs/next_btn.png">
          </div>
          </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.imgList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.imgList img {
  width: 150px;
  max-height: 100px;
}
.imgMask {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
}
.showImg {
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: dialogout 0.3s;
}
.bigImg {
  // width: 100%;
  height: 100%;
}
.prev {
  top: 50%;
  left: -90px;
  width: 45px;
  height: 45px;
  border-radius: 8px;
  line-height: 60px;
  background-color: white;
  // transform: translate(10px, -50%);
}
.prev img,
.next img{
  width: 15px;
  margin-left: -2px;
}
.next {
  width: 45px;
  height: 45px;
  line-height: 60px;
  border-radius: 8px;
  background-color: white;
  // transform: translate(10px, -50%);
  top: 50%;
  right: -90px;
}
@keyframes dialogout {
  from {
    opacity: 0;
  }
}
</style>
<script>
let imglength = 0;
export default {
  data() {
    return {
      showBigImg: false,
      num: 0,
      imgList: []
    };
  },
  // props: ["imgList"],
  methods: {
    bigImg(index, list) {
      this.showBigImg = true;
      this.num = index;
      this.imgList = list;
      imglength = list.length;
    },
    prev() {
      if (this.num == 0) {
        this.num = imglength;
      }
      this.num--;
    },
    next() {
      if (this.num == imglength - 1) {
        this.num = 0;
      }
      this.num++;
    }
  }
};
</script>
