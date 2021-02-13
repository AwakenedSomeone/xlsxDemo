import dialog from './Dialog.vue'
import Tip from './tips/index.js'
import back from './Back.vue'
import bigimg from './BigImg/BigImg.vue'
import UploadFile from './UploadFile.vue'
import TablePage from './TablePage/Table.vue'
import Search from './Search.vue'


function plugin(Vue) {
  Vue.component('nDialog', dialog);
  Vue.component('nTip', Tip);
  Vue.component('nBack', back);
  Vue.component('nImg', bigimg);
  Vue.component('nUploadfile', UploadFile);
  Vue.component('nTable', TablePage);
  Vue.component('nSearch', Search);
  Vue.prototype.$tip = Tip.tip;
}

export default plugin
