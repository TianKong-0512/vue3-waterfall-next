// 导入组件，组件必须声明 name
import vue3Waterfall from './src/index.vue'

// 为组件添加 install 方法，用于按需引入
vue3Waterfall.install = function (Vue: any) {
  Vue.component(vue3Waterfall.name, vue3Waterfall)
}

export default vue3Waterfall
