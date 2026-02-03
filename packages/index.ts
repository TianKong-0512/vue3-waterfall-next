// 导入单个组件
import vue3Waterfall from './waterfall/index'
import vue3WaterfallImage from './waterfallImage/index'


// 以数组的结构保存组件，便于遍历
const components = [vue3Waterfall, vue3WaterfallImage]

// 定义 install 方法
// 使用闭包创建 install 函数
const createInstall = () => {
  let installed = false

  const install = (Vue: any) => {
    if (installed) return
    installed = true

    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }

  return install
}
const install = createInstall()


if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components,
}