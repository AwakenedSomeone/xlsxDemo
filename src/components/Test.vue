<template>
  <div class="hello">
    <SelectTree class="select-demo" :data="selectTree"  />
    <!-- <VideoStream id='1' /> -->
    <DragableTreeTable class="table-demo" :data="tableData" rowKey="tableId">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
        <template slot-scope="{ row }">
          <span @contextmenu.prevent="(e) => {rightClick(e, row)}">{{row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </DragableTreeTable>
    <ContextMenu ref="contextMenu" >
      <li class="menu_item" >新建上级</li>
      <li class="menu_item" >新建下级</li>
    </ContextMenu>
    <!-- <LoginForm :type="2" jampUrl="/test" :ifMd5="false"></LoginForm>
   <button @click="common.testThis($root )" class="btn"></button>
   <n-back :isHide="false" ></n-back>
   <n-dialog ref="dialog" class="txc">
   </n-dialog>
   <n-uploadfile :getFile="fileChange" :num="num" :listType="2" :handleExceed="handleExceed" ></n-uploadfile>
   <n-search :searchFun='search' position="suffix"></n-search>
    <n-table 
    api="QueryUserInfoList"
    :params="setParam"   
    ref="table"
    size="small">
      <el-table-column
              align="center"
              label="序号"
              >
              <template slot-scope="scope">
              {{scope.$index+1}}
              </template>
      </el-table-column>
      <el-table-column
              prop="roleTypeName"
              align="center"
              label="角色类型"
              >
        
      </el-table-column>
      <el-table-column
              align="center"
              label="操作"
              >
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </n-table> -->
  </div>
</template>

<script>
import ContextMenu from './ContextMenu'
import VideoStream from './videoStream'
import DragableTreeTable from './dragableTreeTable'
import SelectTree from './selectTree'
export default {
  name: 'HelloWorld',
  data () {
    return {
      files: [],
      fileArr:[],//放返回的地址
      msg: 'Welcome to Your Vue.js App',
      num: 2,
      input21: "",
      setParam: {
        limit:10,
        headColor: "#000",
        headBg: "rgba(16,175,179, 0.3)"
      },
      selectTree: [],
      tableData: [{
          tableId: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tableId: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          tableId: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              tableId: 31,
              date: '2016-04-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              tableId: 32,
              date: '2016-04-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [{
                tableId: 41,
                date: '2016-03-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                tableId: 42,
                date: '2016-03-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
          }]
        }, {
          tableId: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods:{
    rightClick(MouseEvent, data) { // 鼠标右击触发事件
      this.selectObj = JSON.parse(JSON.stringify(data))
      this.$refs.contextMenu.open(MouseEvent)
    },
    fileChange (fileList) {
      console.log(fileList)
      this.files = fileList;
    },
    search (query) {
      this.$refs.table.searchFun(query);
    },
    test () {
      // this.$tip( {isTip: true, closeTime: 1500, message: "登录过期，请重新登录",func:function () {

      // }});
       this.comRequest.uploadFile(this,this.files, (res)=> {
         console.log(res)
         //先提交文件，得到路径之后，再一起提交其他参数。
       })
    },
    handleExceed () {
      this.$tip({isTip: true, message:"上传文件数量超出限制，最多不超过"+ this.num+"张"})
    },
    showDialog() {
      this.$refs.dialog.dialogSet(null, "biaoti", "400px", "", "42vh", "我是小小弹窗");
    },
    handleClick (obj) {
      console.log(obj);
      this.$refs.table.refresh(1);
    }
  },
  components: {
    VideoStream,
    DragableTreeTable,
    SelectTree,
    ContextMenu
  }
}
</script>


<style  lang="scss">
.hello {
  width: 800px;
  height: 500px;
  .select-demo {
    width: 200px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .table-demo {
    margin: 30px;
  }
}
.btn {
  width: 80px;
  height: 80px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
