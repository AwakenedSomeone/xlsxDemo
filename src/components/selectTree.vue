<template>
  <div class="select-wrap" v-clickoutside="close">
    <el-input
      placeholder="请输入内容"
      :prefix-icon="prefixIcon"
      @input="search"
      @focus="visiableChange"
      size="small"
      v-model="input">
      <slot name='prefix'></slot>
      <slot name="suffix"></slot>
    </el-input>
    <transition name="sub-comments">
      <div v-if="visiable" class="select-box" ref="treeBox" >
        <div class="arrow"></div>
        <el-scrollbar style="height: 100%">
          <el-tree
            ref="tree"
            id="tree"
            :default-expanded-keys="defaultExpanded"
            :data="data"
            :node-key="nodeKey"
            @node-click="curentClick"
            :props="defaultProps"
            highlight-current>
          </el-tree>
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    searchKey: {
      type: [String, Number],
      default: 'label'
    },
    nodeKey: {
      type: [String, Number],
      default: 'id'
    },
    prefixIcon: {
      type: String,
      default: ''
    }
  },
  directives: { Clickoutside },
  data () {
    return {
      input: '',
      visiable: false,
      defaultExpanded: []
    }
  },
  methods: {
    curentClick (data, node) {
      if (node.isLeaf) {
        this.input = data.label
        this.$emit('curentChange', data)
        this.close()
      }
    },
    visiableChange () {
      this.visiable = true
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(null)
      })
    },
    close () {
      this.visiable = false
    },
    search () {
      if (!this.input) {
        this.$refs.tree.setCurrentKey(null)
        return
      }
      console.log(this.input)
      this.defaultExpanded = []
      let nodes = this.$refs.tree.store.nodesMap
      for(var i in nodes){
          nodes[i].expanded = false
      }
      let index = 0
      const func = (arr, parent) => {
        let result = null
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          if (item[this.searchKey].indexOf(this.input) !== -1) {
              result = item
              index += i
             if (parent) {
               result.pid = parent.id
             }
              break
            } else if (item[this.defaultProps.children]) {
              index += i
              result = func(item[this.defaultProps.children], item)
              if (result) {
                break
              }
            } else if (i === arr.length - 1) {
              result = null
              break
            }
        }
        return result
      }
      let obj = func(this.data)
      if (obj) {
        this.$refs.tree.setCurrentKey(obj[this.nodeKey])
        const node = this.$refs.tree.getNode(obj[this.nodeKey])
        let nodeHeight = 26
        console.log(node)
        if (obj.pid) {
          this.defaultExpanded = [obj.pid]
        }
        this.$nextTick(() => {
          const dom = document.querySelector('.el-scrollbar__wrap')
          dom.scrollTop = nodeHeight * node.level  + nodeHeight * index
        })
      } else {
        this.$refs.tree.setCurrentKey(null)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select-wrap {
  position: relative;
  min-width: 100px;
  /deep/ .el-input__inner {
    border: 1px solid #DCDFE6;
  }
  .select-box {
    width: 100%;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
.select-box {
  position: absolute;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
  margin: 10px 0;
  padding: 10px;
  height: 300px;
  z-index: 999;
  .arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    top: -6px;
    left: 10%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #ebeef5;
    &::after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      top: 1px;
      content: " ";
      border-width: 6px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color: #fff;
    }
  }
}
.sub-comments-leave-active,.sub-comments-enter-active {
  transition: max-height 0.3s linear;
}
.sub-comments-enter,.sub-comments-leave-to {
  max-height:0 ;
  opacity: 0;
}
.sub-comments-enter-to,.sub-comments-leave {
  max-height: 250px ;
}

</style>