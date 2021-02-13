<template>
<div>

        <el-upload class="avatar-uploader vtm disi upBox" style="margin-left:0;"
          :list-type="listTypeName"
          ref="newupload"
          :multiple="true"
          :file-list="file"
          :limit="num"
          :accept="uploadType"
          name="file"
          :show-file-list="ifShowList"
          :action="upUrl"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :on-change="(f, fs) => fileChange(f, fs,1)"
          :on-remove="(f, fs) => fileRemove(f, fs,1)">
          <el-button size="small" type="primary" v-if="btnType == 1">点击上传</el-button>
          <img v-if="imgUrl && !ifShowList" :src="imgUrl.url" class="avatar">
          <i v-else-if="btnType == 0" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

</div>
</template>
<script>
export default {
    data () {
        return {
            imgUrl:"",
            file:[],
            upUrl: "xx",
            listTypeName:"picture-card",
            ifShowList: true,
            btnType: 0,//默认加号按钮
        }
    },
    props: {
        getFile:{
            type:Function,
            default: null
        }, //传递文件给父组件
        listType:{
            type: Number,
            default: 2 //0: 没有列表，用于上传头像时展示 1. card形式展示 2. 列表类型，搭配button按钮 3.缩略图形式搭配button按钮
        },//文件展示类型
        num: {
            type: Number,
            default: 1, //默认单张上传
        },
        handleExceed: {
            type: Function,
            default: null
        },//文件个数超出限制时的回调
        uploadType: {
            type: String,
            default: "image/*"
        }
    },
    mounted () {
        this.init()
    },
    methods:{
        init () {
            //初始化列表展示形式
            switch (this.listType) {
                case 0:
                    this.listTypeName = "picture-card";
                    this.ifShowList = false;
                    break;
                case 1:
                    this.listTypeName = "picture-card";
                    break;
                case 2:
                    this.listTypeName = "";
                    this.btnType = 1;
                    break;
                case 3:
                    this.listTypeName = "picture";
                    this.btnType = 1;
                    break;
                default:
                    this.listTypeName = "picture";
                    this.btnType = 1;
                    break;
            }
        },
         // 文件状态改变时的钩子
        fileChange(file, fileList,t) {
            this.file = fileList;
            this.imgUrl = fileList[0];
            this.getFile(fileList)
        },
        //图片、文件移除
        fileRemove(file, fileList, t) {
            this.getFile(fileList)
        }
    }
}
</script>
<style lang="scss">
.avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>