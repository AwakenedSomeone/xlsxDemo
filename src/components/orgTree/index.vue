<template>
  <ul class="node-contanier" >
    <li class="node-item" v-for="(item, index) in showData" :key="item.id">
      <span
        :class="['node-label', getLabelClass(item), item.isNewAdd ? 'blue-bg' : '']"
        :style="{ width: getWidth + 'px' }"
        @contextmenu="(e) => {rightClick(e, item, index)}"
        @click="nodeClick(item, index)"
      >
       <span v-if="!item.isInput" class="label-text" >{{item.name}}</span>
        <el-input v-if="item.isInput" v-model="item.name" placeholder="请输入内容" style="margin: -10px" @keyup.enter.native="saveAdd(item, index)" @blur="saveAdd(item, index)"></el-input>
        <i
          :class="['icon-folder', item.isExpanded ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline' ]"
          v-if="item.children && item.children.length > 0"
          @click="changeExpand(item, index)"></i>
      </span>
      <div v-if="item.isExpanded" :class="['node-child', item.children && item.children.length > 0 ? 'left-line' : '']" :style="{ left: (getWidth + 70) + 'px' }">
        <OrgTree :data="item.children" :maxLevel="6" />
      </div>
    </li>
  </ul>
</template>
<script>
import bus from '@/utils/bus'
export default {
  name: 'OrgTree',
  inject: ['containerId', 'specialLevelKey', 'specialLevel'],
  props: {
    maxLevel:  {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showData: [],
      colGap: 70,
      containerWidth: 0,
      editIndex: -1,
      oldValue: ''
    }
  },
  mounted () {
    bus.$on('editInput', (data) => {
      this.oldValue = data.name
      this.editInput(data)
    })
    this.$nextTick(() => {
      this.containerWidth = document.querySelector(`#${this.containerId}`).clientWidth
    })
  },
  computed: {
    getWidth () {
      const width = this.containerWidth / 6 - this.colGap
      return width
    },
    getLabelClass () {
      return (item) => {
        let className = ''
        if (item.children && item.isExpanded) {
          className += ' label-after'
        }
        if (item.level > 0) {
          className += ' label-before'
        }
        return className 
      }
    }
  },
  watch: {
    data: {
      handler: function (val) {
        this.showData = JSON.parse(JSON.stringify(val))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    editInput (data) {
      let flag = false
      const source = JSON.parse(JSON.stringify(this.showData))
      const func = (arr) => {
        arr.forEach(item => {
          if (item.id === data.id) {
            item.isInput = true
            flag = true
          }
        })
      }
      func(source)
      if (flag) {
        this.$set(this, 'showData', source)
      }
    },
    saveAdd (item, index) {
      if (item.name.trim()) {
        this.$set(item, 'isInput', false)
        this.$message('已保存')
        // this.$message.success('已保存')
      } else {
        if (this.oldValue) {
          this.$set(item, 'name', this.oldValue)
          this.$set(item, 'isInput', false)
        } else {
          this.showData.splice(index, 1)
        }
        
      }
    },
    rightClick (e, item, index) {
      if (item.level === 0 || item.isNewAdd) {
        return
      }
      e.preventDefault()
      bus.$emit('rightClick', e, this.data[index])
    },
    nodeClick (data, index) {
      if (data.level < this.maxLevel - 1 && !data.isInput) {
        console.log(this.specialLevel, data.level)
        const obj = {
          id: data.level + 1 + '' + Math.random(),
          level: data.level + 1,
          isNewAdd: true,
          name: this.specialLevel === -1 || (this.specialLevel - 1) !== data.level ? `+ 新建`: `+ ${this.specialLevelKey}`
        }
        if (data.children === undefined) {
          if (!data.isNewAdd) {
            this.$set(data, 'children', [obj])
          }
        } else if (data.children.length && !data.children[data.children.length - 1].isNewAdd) {
          data.children.push(obj)
        }
      }
      if (data.isNewAdd && data.level !== this.specialLevel) {
        let flag = true
        this.showData.forEach(ele => {
          if (ele.isInput) {
            flag = false
          }
        })
        if (flag) {
          const obj = {
            id: Math.random(),
            name: '',
            level: data.level,
            isInput: true
          }
          this.showData.splice(this.showData.length - 1, 0, obj)
        }
      }
      bus.$emit('nodeClick', this.data[index])

    },
    changeExpand (item, index) {
      this.showData.forEach((ele, ind) => {
        if (ind !== index) {
          if (ele.isExpanded) {
            ele.isExpanded = false
          }
        }
      })
      item.isExpanded = !item.isExpanded
      this.$forceUpdate()
    },
  }
}
</script>
<style lang="scss" scoped>
$line: #ccc;
.node-contanier {
  width: 100%;
  .node-item {
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
    .node-label {
      position: relative;
      display: inline-block;
      background: #F0F7FF;
      color: #5EA9FF;
      padding: 0px 5px;
      margin-right: 20px;
      text-align: center;
      height: 32px;
      line-height: 32px;
      border: 1px solid #5EA9FF;
      border-radius: 6px;
      &.blue-bg {
        background: #1F88FF;
        color: #fff;
      }
      .label-text {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }
      .icon-folder {
        position: absolute;
        right: -13px;
        top: 50%;
        transform: translateY(-50%);
        color: #5EA9FF;
        cursor: pointer;
      }
      &.label-after::after {
        position: absolute;
        right: -45px;
        top: 50%;
        // transform: translate(100%, -50%);
        width: 30px;
        height: 1px;
        background: $line;
        content: '';
        cursor: auto;
      }
      &.label-before::before {
        position: absolute;
        left: -40px;
        top: 50%;
        width: 30px;
        height: 1px;
        background: $line;
        content: '';
      }
    }
    .node-child {
      position: absolute;
      top: 0;
      z-index: 999;
      &.left-line::before {
        position: absolute;
        left: -40px;
        top: 16px;
        width: 1px;
        height: calc(100% - 55px);
        background: $line;
        content: '';
      }
    }
  }
}
</style>