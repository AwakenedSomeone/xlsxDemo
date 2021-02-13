<template>
  <div class="container" id="org-container">
    <div class="head">
      <span v-for="(item, index) in heads" :key="index">
        {{item.name}}
      </span>
    </div>
    <OrgTree :data="treeData" :maxLevel="6"   />
    <ContextMenu ref="contextMenu" >
      <li class="menu_item" @click="edit">编辑</li>
      <li class="menu_item" >删除</li>
    </ContextMenu>
  </div>
</template>
<script>
import ContextMenu from '@/components/ContextMenu'
import OrgTree from '@/components/orgTree'
import bus from '@/utils/bus'
export default {
  data () {
    return {
      treeData: [
        {
          id: '1',
          name: '冷轧厂',
          level: 0,
          children: [
            {
              id: '1-1',
              name: '违章处理',
              level: 1,
              children: [
                {
                  id: '1-1-1',
                  level: 2,
                  name: '倒班作业长提交',
                  children: [
                    {
                      id: '1-1-1-1',
                      name: '送-作业区安全员',
                      level: 3,
                      children: [
                        {
                          id: '1-1-1-1-1',
                          name: '作业区安全员',
                          level: 4,
                          children: [
                            {
                              id: '1-1-1-1-1-1',
                              name: '胡某某',
                              level: 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: '1-1-2',
                  level: 2,
                  name: '作业区安全员提交'
                }
              ]
            },
            {
              id: '1-2',
              name: '隐患处理',
              level: 1
            }
          ]
        },
        {
          id: '2',
          level: 0,
          name: '炼钢厂'
        }
      ],
      heads: [
        { name: '厂区' },
        { name: '流程名称' },
        { name: '节点名称' },
        { name: '环节名称' },
        { name: '角色名称' },
        { name: '用户列表' }
      ],
      selectObj: null
    }
  },
  provide: {
    containerId: 'org-container',
    specialLevelKey: '新增',
    specialLevel: 5
  },
  mounted () {
    bus.$on('rightClick', (e, data) => {
      this.pop(e, data)
    })
    bus.$on('nodeClick', (data) => {
      if (data.level === 5) {
      }
    })
  },
  methods: {
    edit () {
      bus.$emit('editInput', this.selectObj)
    },
    pop (e, data) {
      this.selectObj = data
      this.$nextTick(() => {
        this.$refs.contextMenu.open(e)
      })
    }
  },
  components: {
    OrgTree,
    ContextMenu
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin: 40px;
  width: 1400px;
  height: 800px;
  font-size: 13px;
  .head {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: calc(100%/6 - 70px);
      text-align: center;
      margin-right: 70px;
      background: #F8F8F8;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      color: #666666;
    }
  }
}
</style>