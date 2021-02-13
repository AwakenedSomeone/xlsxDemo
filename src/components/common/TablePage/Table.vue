<template>
    <div style="height: 400px;">
        <!-- 表格数据 -->

        <el-table
        :data="tableData"                      
        :height="tableHeight"  
        v-loading="loading"    
        :size="size"
        :row-style="tableRowStyle"
        :header-cell-style="headStyle"        
        @sort-change = "sortChange"  
        @selection-change="selectionChange" 
        @current-change="currentChange" 
        @row-click = "rowClick"    
        style="width: 100%">
            <slot></slot>
        </el-table>
        <el-pagination
        v-if="paging"
        background
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-size="params.limit"
        layout="prev, pager, next"
        :total="tableCount">
        </el-pagination>
    </div>
</template>
<script>
export default {
  data() {
    return {
        data: {
        page: 0,
        page_size: 10
      },
      query: "",
      currentPage: 1,
      tableCount: 30, //总条数
      tableData: [
        {
          roleTypeName: "刘琴"
        },
        {
        roleTypeName: "刘琴"
        },
        {
          roleTypeName: "刘琴"
        },
        {
        roleTypeName: "刘琴"
        },
        {
          roleTypeName: "刘琴"
        },
        {
        roleTypeName: "刘琴"
        },
        {
          roleTypeName: "刘琴"
        },
        {
        roleTypeName: "刘琴"
        },
        {
          roleTypeName: "刘琴"
        },
        {
        roleTypeName: "刘琴"
        },
        {
          roleTypeName: "刘琴"
        },
        {
        roleTypeName: "刘琴"
        }
      ], //表格数据
      loading: false, //loading动画
    };
  },
  props: {
    //请求接口
    api: {
      required: true
    },
    //参数  默认返回分页和条数
    params: {
      type: [Object,String,Number],
      default: function() {
        return { limit: 10, headColor: "#000", headerBg:"transparent",rowBg: "#f0f0f5", rowColor:"#000" };
      }
    },
    // 尺寸
    size: {
      default: 'small'
    },
    // 分页
    paging: {
      default: true
    }
  },
  
  created() {
    this.init(this.data);
  },
  computed: {
    tableHeight:function(){
      return this.paging?'calc(100% - 32px)':'100%'
    }
  },
  methods: {
    init(params) {
      // this.loading = true;
      // this.post(this, this.api, params).then((res)=>{
      //   this.loading = false;
      //   if (res.state == 0) {
      //     this.tableData = res.ext.result;
      //     this.tableCount = res.ext.total_count;
      //   } else {
      //     this.tableData = [];
      //   }
      // })
    },
    // 重新请求 //如果需要重新请求使用$refs 调用这个方法
    reload() {
      // 如果有分页
      if(this.paging){
        this.currentPage = 1;
        this.data.page = 0;
      }
      // api动态加载完 开始重新请求数据
      this.$nextTick(()=>{
        this.init(this.data);
      })
    },
    //刷新当前页，比如删除了列表某一项，要刷新当前页面，或者是使用了缓存，编辑了数据返回当前页面，也需要刷新当前页面。
    refresh(t) {
      // 重新请求数据
      if (t == 1 && this.tableData.length == 1) {
        //t == 1 为删除时刷新页面，要注意是否删除的是最后一页的最后一条，如果是，则需要将page-1
        this.data.page--;
        this.currentPage --;
      }
      this.$nextTick(()=>{
        this.init(this.data);
      })
    },
    //以下是对el-table原来的方法再次封装emit出去
    // 多选
    selectionChange(val){
      this.$emit('selection-change',val)
    },
    // 单选
    currentChange(currentRow, oldCurrentRow){
      this.$emit('current-change',currentRow, oldCurrentRow)
    },
    rowClick(row, event, column){
      this.$emit('row-click',row, event, column)
    },
    // 排序
    sortChange(column, prop, order){
      this.$emit('sort-change',column, prop, order)
    },
    // 表格翻页
    pageChange(page) {
      this.currentPage = page;
      this.data.page = page - 1;
      this.init(this.data);
    },
    //搜索
    searchFun (query) {
      this.data.page = 0;
      this.currentPage = 1;
      this.data.query = query;
      this.init(this.data);
    },
     //设置表格行的颜色
    tableRowStyle () {
      return "background: "+this.params.rowBg+";color:"+this.params.rowColor+"; font-weight:normal;border-radius: 15px;"
    },
    //设置表头颜色
    headStyle ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:"+this.params.headBg+";color:"+this.params.headColor+"; font-weight:normal; border-radius: 5px;";
      }
      
    }
  }
};
</script>
<style lang="scss">
@import "./css/element.scss"
</style>