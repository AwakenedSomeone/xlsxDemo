<template>
    <el-dialog @opened="opened" :class="['fillPop', 'fileSet' ,'boxshadows' ,'bdr',!showClose?'showClose':'']" :show-close="showClose" :title="diaTit" :visible.sync="dialog" :modal-append-to-body="false" :top="top" :width="diaWidth">
		    <slot name="diaSlot">
		    	<div class="txc mgb10 f18 main">{{msg}}</div>
          <div class="txc mgt30 mgb15">
            <span  class="sub-btn" @click="diaSure">确定</span>
            <span class="sub-btn mgl20" @click="dialog = false">取消</span>
	        </div>
		    </slot>
		</el-dialog>
</template>
<style lang="scss">
$pink-color:#FB9FB4;
$back-filter-webkit: -webkit-linear-gradient(to bottom,#fa4331, #f53e77);
$back-filter: linear-gradient(to bottom,#fa4331, #f53e77);
$back-filter-webkit-b: -webkit-linear-gradient(to bottom,#fa4331, #f53e77);
$back-filter-b: linear-gradient(to bottom,#fa4331, #f53e77);
.el-dialog {
  background-color: #fff;
  box-shadow: none;
  border-radius: 10px;
  .layerimg {
    width: 100%;
  }
}
.el-dialog{border-radius: 15px;}
.el-dialog__header{padding: 20px 20px 0 20px;}
.el-dialog__headerbtn{top: 15px;z-index: 500;}
.el-dialog__headerbtn .el-dialog__close{font-weight: 700;font-size: 22px;}
.el-dialog__body{padding: 0 20px 30px 20px;}
.commbtn {
  padding: 12px 35px;
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  border: 1px solid #fff;
}
.sub-btn{padding: 8px 25px;min-width: 100px; text-align: center;display: inline-block; border-radius: 11px;color: #fff;font-size: 15px;cursor: pointer;line-height: 20px;background: $back-filter-webkit;background: $back-filter;}
.sub-btn-gray{background:$pink-color;cursor: default;pointer-events: none;}
@keyframes dialog {
  from {
    margin-top: 18%;
    opacity: 0;
  }
}
@keyframes dialogout {
  from {
    opacity: 0;
  }
}
</style>
<script>
export default {
  data() {
    return {
      dialog: false,
      diaTit: "",
      diaWidth: "",
      top: "",
      msg: ""
    };
  },
  props: {
    showClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //弹框
    dialogSet(fun, tit, width, el, top, msg) {
      this.dialog = true;
      typeof fun == "function" && (this.diaFun = fun);
      this.diaTit = tit || "";
      this.diaWidth = width || "330px";
      this.msg = msg || "确认删除？";
      this.top = top || "42vh";
      if (el) {
        //说明弹框里面有表单，需要重置
        el.resetFields();
      }
    },
    diaSure(fun) {
      this.dialog = false;
      this.diaFun();
    },
    cancel() {
      this.dialog = false;
    },
    opened() {
      this.$emit('openedFun',{});
    }
  }
};
</script>


