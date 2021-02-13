
<template>
  <div class="search_box">
        <el-input
          :placeholder="placeholder"
          v-model="search"
          @change="changfun"
          >
          <i :slot="position" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
</template>

<script>
export default {
	props: {
		searchFun: {
			type: Function,
			default: {}
		},
		placeholder: {
			type: String,
			default: "请输入关键词搜索"
		},
		position: {
			type: String,
			default: "prefix"
		}
	},
	watch: {
		search:{
			handler(val, oldVal) {
				this.changfun();
			},
      		deep: true
		} 
	},
	data () {
		return {
			search: ""
		}
	},
	methods: {
		changfun() {
			this.searchFun(this.search);
		}
	}
}
</script>


<style scoped>
.search_box {
  width: 200px;
}
.el-icon-search:before {
	font-size: 18px;
}
</style>
