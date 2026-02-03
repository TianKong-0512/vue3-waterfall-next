// 导入组件，组件必须声明 name
import vue3WaterfallImage from './src/index.vue'

// 为组件添加 install 方法，用于按需引入
vue3WaterfallImage.install = function (Vue: any) {
  Vue.component(vue3WaterfallImage.name, vue3WaterfallImage)
}

export default vue3WaterfallImage
