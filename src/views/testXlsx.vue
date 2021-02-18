<template>
  <div class="page-container">
    <h1 class="title">表格归纳demo</h1>
    <div class="content">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
        ref="upload"
        :multiple="false"
        :on-change="upload"
        :file-list="fileList">
        <el-button size="small" type="primary">{{uploading ? '文件上传中' : '选择文件上传'}}</el-button>
        <div slot="tip" class="el-upload__tip">只能xls或xlsx文件</div>
      </el-upload>
      <el-row class="input-ctrl">
        <el-col :span="6">合并层级：</el-col>
        <el-col :span="18">
          <el-input  v-model="level" placeholder="请输入需要合并的层级" @keyup.enter.native="toDealData"></el-input>
          <p class="tips">tips: 按enter重新根据层级处理</p>
        </el-col>
      </el-row>
      <el-row class="input-ctrl">
        <el-col :span="6">表格名称：</el-col>
        <el-col :span="18">
          <el-input  v-model="name" placeholder="请输入导出的表格名称"></el-input>
        </el-col>
      </el-row>
      <div>
        <el-button type="primary" @click="getExport">导出</el-button>
        <el-button  @click="reset">重置</el-button>
      </div>
      <el-row class="input-ctrl">
        <el-col :span="6">选择明细: </el-col>
        <el-col :span="18">
          <el-select v-model="selectValue" placeholder="请选择" style="width:100%">
            <el-option
              v-for="(value, key) in dealData"
              :key="key"
              :label="key"
              :value="key">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="input-ctrl">
        <el-col :span="6">明细表格名称：</el-col>
        <el-col :span="18">
          <el-input  v-model="subName" placeholder="请输入导出的表格名称"></el-input>
        </el-col>
      </el-row>
      <div>
        <el-button type="primary" @click="downLoadDetail">导出明细</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {
      currentData: [],
      tmpData: [], // 暂存的数据
      fileList: [],
      level: 3,
      uploading: false,
      name: 'new',
      options: [],
      selectValue: '',
      subName: '明细表名称',
      dealData: []
    }
  },
  methods: {
    reset () {
      this.tmpData = []
      this.fileList = []
      this.dealData = []
      this.selectValue = ''
    },
    upload(file, fileList) {
      if (fileList.length > 1) {
        this.$message.error('最多只能上传一个文件哦！')
        this.reset()
        return false
      }
      this.uploading = true
      let files = {0:file.raw}
      this.readExcel1(files);
    },
    readExcel1(files) {//表格导入
            var that = this;
            if(files.length<=0){//如果没有文件名
                return false;
            }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }
    
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
              try {
                  const data = ev.target.result;
                  const workbook = XLSX.read(data, {
                      type: 'binary'
                  });
                  const wsname = workbook.SheetNames[0];//取第一张表
                  const result = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                  result.sort(this.compare('科目编号'))
                 this.tmpData = result
                 this.getLevelTotal(JSON.parse(JSON.stringify(this.tmpData)), parseInt(this.level))
                 this.uploading = false
              } catch (e) {
                this.uploading = false
                this.reset()
                this.$message.error('您选择的文件可能有些问题，请检查格式是否正确呢！')
                  return false;
              }
            }
            fileReader.readAsBinaryString(files[0])
    },
    getExport () {
      if (this.uploading) {
        this.$message.error('正在上传中，请稍后再试!')
        return
      }
      if (this.tmpData.length === 0) {
        this.$message.error('您还没有选择文件呀！')
        return false
      }
      this.downLoad(this.currentData, this.name)
    },
    downLoadDetail () {
      if (this.uploading) {
        this.$message.error('正在上传中，请稍后再试!')
        return
      }
      if (this.tmpData.length === 0) {
        this.$message.error('您还没有选择文件呀！')
        return false
      }
      let data = this.getDetailTable()
      this.downLoad(data, this.subName)
    },
    getDetailTable() {
     return this.dealData[this.selectValue] 
    },
    compare (prop) {
      return function (obj1, obj2) {
        let val1 = obj1[prop]
        let val2 = obj2[prop]
        if (val1 && val2) {
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        } else {
          return 0
        }
      }
    },
    toDealData() {
      this.getLevelTotal (this.tmpData, this.level)
    },
    getLevelTotal (data, n) {
      const outputData = []
      const dealData = {}
      data.forEach(item => {
        const code = item['科目编号']
        if (code) {
          const len = outputData.length
          const name = code.split('-').slice(0, n).join('-')
          if (len === 0) {
            if (!dealData[name]) {
              dealData[name] = [item]
            } else {
              dealData[name].push(item)
            }
            outputData.push({
              '科目编号': name,
              '借方': item['借方'],
              '贷方': item['贷方'],
              '余额': this.fixedNum(parseFloat(item['借方']) - parseFloat(item['贷方']))
            })
          } else {
            const lastData = outputData[len - 1]
            const lastArr = lastData['科目编号'].split('-')
            const nowArr = code.split('-')
            // 按照短的比较
            let flagInd = 0
            let targetStr = []
            const  length = lastArr.length - nowArr.length > 0 ? nowArr.length : lastArr.length
            for (let i = 0; i < length; i++) {
              if (i < n) {
                if (lastArr[i] === nowArr[i]) {
                  flagInd++
                  targetStr.push(lastArr[i])
                } else {
                  break
                }
              } else {
                break
              }
            }
            if (flagInd === n || (lastData['科目编号'] === code)) {
              const name = targetStr.join('-')
                if (!dealData[name]) {
                dealData[name] = [item]
              } else {
                dealData[name].push(item)
              }
              outputData[len - 1]['借方'] += this.fixedNum(item['借方'])
              outputData[len - 1]['贷方'] += this.fixedNum(item['贷方'])
              outputData[len - 1]['余额'] = this.fixedNum(outputData[len - 1]['借方'] - outputData[len - 1]['贷方'] )
              outputData[len - 1]['科目编号'] = name
            } else {
               const name = code.split('-').slice(0, n).join('-')
                if (!dealData[name]) {
                dealData[name] = [item]
              } else {
                dealData[name].push(item)
              }
              outputData.push({
                '科目编号': name,
                '借方': item['借方'],
                '贷方': item['贷方'],
                '余额': this.fixedNum(parseFloat(item['借方']) - parseFloat(item['贷方']))
              })
            }
          }
        }
      })
      this.currentData = outputData
      this.dealData = dealData
    },
    fixedNum(value) {
      return parseFloat(value).toFixed(2) - 0
    },
    downLoad (json, name) {
      var data = new Array();
      var keyArray = new Array();

      for (const key1 in json) {
          if (json.hasOwnProperty(key1)) {
              const element = json[key1];
              var rowDataArray = new Array();
              for (const key2 in element) {
                  if (element.hasOwnProperty(key2)) {
                      const element2 = element[key2];
                      rowDataArray.push(element2);
                      if (keyArray.length < this.getLength(element)) {
                          keyArray.push(key2);
                      }
                  }
              }
              data.push(rowDataArray);
          }
      }
      data.splice(0, 0, keyArray);
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate file and send to client */
      XLSX.writeFile(wb, name + ".xlsx");
    },
    /**
 * @description: 获取map的长度
 * @param {Object} obj map对象 
 * @return: map的长度
 */
    getLength (obj) {
      var count = 0;
      for (var i in obj) {

          if (obj.hasOwnProperty(i)) {
              count++;

          }
      }
      return count;
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  .title {
    text-align: center;
  }
  .content {
    text-align: center;
    margin: 40px auto;
    width: 500px;
    background: #f2f2f2;
    padding: 20px;
    border-radius: 15px;
    .input-ctrl {
      margin: 30px 0;
      line-height: 40px;
    }
    .tips {
      text-align: left;
      color: #333;
    }
  }
}
</style>