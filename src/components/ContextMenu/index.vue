<template>
  <div v-show="menuVisible">
    <ul id="menu" class="menu">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuVisible: false
    }
  },
  methods: {
    open(MouseEvent) { // 鼠标右击触发事件
      this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector('#menu')
      document.addEventListener('click', this.close) // 给整个document添加监听鼠标事件，点击任何位置执行close方法
      menu.style.display = 'block'
      menu.style.left = MouseEvent.clientX - 0 + 'px'
      menu.style.top = MouseEvent.clientY + 'px'
    },
    close() { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.close) // 要及时关掉监听
    }
  }
}
</script>
<style lang="scss" scoped>
.menu_item {
  line-height: 20px;
  text-align: center;
  margin-top: 5px;
  list-style: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  display: block;
}

.menu {
  // height: 100px;
  // width: 80px;
  padding: 10px 15px;
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 0 2px #999;
  background-color: #fff;
  z-index: 999;
}
</style>