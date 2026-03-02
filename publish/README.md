# Vue3-Waterfall

一个功能强大的Vue3瀑布流布局插件，支持基础瀑布流和图片瀑布流两种模式。

## 特性

- 🚀 **Vue3 Composition API** - 完全基于Vue3 Composition API开发
- 📱 **响应式设计** - 自动适应不同屏幕尺寸
- 🖼️ **图片懒加载** - 支持图片懒加载和自适应高度
- 🔧 **高度可定制** - 支持自定义列数、间距、插槽等
- 🎯 **TypeScript支持** - 完整的TypeScript类型定义
- 📦 **轻量级** - 无额外依赖，体积小巧

## 安装

```bash
npm install vue3-waterfall
# 或
yarn add vue3-waterfall
```

## 快速开始

### 全局注册

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Vue3Waterfall from 'vue3-waterfall'

const app = createApp(App)
app.use(Vue3Waterfall)
app.mount('#app')
```

### 局部引入

```vue
<template>
  <div>
    <vue3-waterfall :list="items" :columns="3">
      <template #default="{ item, index }">
        <div class="item">
          {{ item.content }}
        </div>
      </template>
    </vue3-waterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3Waterfall } from 'vue3-waterfall'

const items = ref([
  { id: 1, content: '项目1' },
  { id: 2, content: '项目2' },
  // ...更多项目
])
</script>
```

## 组件介绍

### 1. vue3-waterfall (基础瀑布流组件)

基础瀑布流组件，适用于任何类型的DOM元素布局。

#### 基本用法

```vue
<template>
  <vue3-waterfall :list="items" :columns="3" :column-gap="10" :row-gap="10">
    <template #default="{ item, index }">
      <div class="custom-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </template>
  </vue3-waterfall>
</template>
```

#### Props

| 属性名       | 类型   | 默认值 | 说明           |
| ------------ | ------ | ------ | -------------- |
| list         | Array  | []     | 数据列表       |
| columns      | Number | 2      | 列数           |
| columnGap    | Number | 10     | 列间距(px)     |
| rowGap       | Number | 10     | 行间距(px)     |
| onlyFiledKey | String | ''     | 唯一标识字段名 |

#### 方法

- `refresh()`: 手动刷新瀑布流布局

### 2. vue3-waterfall-image (图片瀑布流组件)

专门为图片设计的瀑布流组件，支持图片懒加载和自适应高度。

#### 基本用法

```vue
<template>
  <vue3-waterfall-image
    :list="imageList"
    :columns="3"
    :column-gap="10"
    :row-gap="10"
    @img-click="handleImageClick"
  >
    <!-- 自定义图片内容 -->
    <template #default="{ item, index }">
      <img :src="item.src" :alt="item.alt" />
    </template>

    <!-- 自定义头部内容 -->
    <template #header="{ item, index }">
      <div class="image-header">{{ item.title }}</div>
    </template>

    <!-- 自定义底部内容 -->
    <template #footer="{ item, index }">
      <div class="image-footer">{{ item.description }}</div>
    </template>
  </vue3-waterfall-image>
</template>
```

#### Props

| 属性名        | 类型    | 默认值 | 说明               |
| ------------- | ------- | ------ | ------------------ |
| list          | Array   | []     | 图片数据列表       |
| columns       | Number  | 2      | 列数               |
| columnGap     | Number  | 10     | 列间距(px)         |
| rowGap        | Number  | 10     | 行间距(px)         |
| imgViewBind   | Object  | {}     | 图片容器绑定属性   |
| loadEndAppend | Boolean | false  | 加载完成后是否追加 |
| onlyFiledKey  | String  | 'id'   | 唯一标识字段名     |

#### 事件

- `img-click`: 图片点击事件，返回 `{ index, item, imageReact }`

#### 插槽

- `default`: 图片内容插槽
- `header`: 图片头部插槽
- `footer`: 图片底部插槽

## 完整示例

### 基础瀑布流示例

```vue
<template>
  <div class="container">
    <h2>基础瀑布流示例</h2>
    <vue3-waterfall
      ref="waterfallRef"
      :list="items"
      :columns="columns"
      :column-gap="15"
      :row-gap="15"
    >
      <template #default="{ item, index }">
        <div class="item-card" :style="{ backgroundColor: getRandomColor() }">
          <h3>项目 {{ index + 1 }}</h3>
          <p>高度: {{ item.height }}px</p>
          <p>内容: {{ item.content }}</p>
        </div>
      </template>
    </vue3-waterfall>

    <button @click="addItem">添加项目</button>
    <button @click="refreshLayout">刷新布局</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Vue3Waterfall } from 'vue3-waterfall'

const waterfallRef = ref()
const columns = ref(3)
const items = ref([])

// 生成随机高度的项目
const generateItems = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    height: Math.floor(Math.random() * 200) + 100,
    content: `这是第 ${i + 1} 个项目的内容`,
  }))
}

// 获取随机颜色
const getRandomColor = () => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 添加新项目
const addItem = () => {
  const newItem = {
    id: items.value.length + 1,
    height: Math.floor(Math.random() * 200) + 100,
    content: `新添加的项目 ${items.value.length + 1}`,
  }
  items.value.push(newItem)
}

// 刷新布局
const refreshLayout = () => {
  if (waterfallRef.value) {
    waterfallRef.value.refresh()
  }
}

onMounted(() => {
  items.value = generateItems()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.item-card {
  padding: 15px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button {
  margin: 10px 5px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### 图片瀑布流示例

```vue
<template>
  <div class="container">
    <h2>图片瀑布流示例</h2>
    <vue3-waterfall-image
      :list="imageList"
      :columns="columns"
      :column-gap="10"
      :row-gap="10"
      @img-click="handleImageClick"
    >
      <template #header="{ item, index }">
        <div class="image-header">图片 {{ index + 1 }}</div>
      </template>

      <template #default="{ item, index }">
        <img :src="item.src" :alt="item.alt" class="waterfall-image" @load="onImageLoad" />
      </template>

      <template #footer="{ item, index }">
        <div class="image-footer">
          <p>{{ item.description }}</p>
          <span class="image-size">{{ item.width }} × {{ item.height }}</span>
        </div>
      </template>
    </vue3-waterfall-image>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3WaterfallImage } from 'vue3-waterfall'

const columns = ref(4)
const imageList = ref([
  {
    id: 1,
    src: 'https://picsum.photos/300/400?random=1',
    alt: '图片1',
    width: 300,
    height: 400,
    description: '这是一张美丽的风景图片',
  },
  {
    id: 2,
    src: 'https://picsum.photos/300/500?random=2',
    alt: '图片2',
    width: 300,
    height: 500,
    description: '城市夜景',
  },
  // 更多图片...
])

const handleImageClick = (event) => {
  console.log('点击的图片信息:', event)
  // 可以在这里处理图片点击逻辑，比如打开预览模态框
}

const onImageLoad = (event) => {
  console.log('图片加载完成:', event)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.waterfall-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.image-header {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px 4px 0 0;
  font-weight: bold;
}

.image-footer {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 0 0 4px 4px;
}

.image-size {
  font-size: 12px;
  color: #6c757d;
}
</style>
```

## 响应式配置

插件支持响应式列数配置，可以根据屏幕宽度自动调整列数：

```vue
<template>
  <vue3-waterfall-image
    :list="imageList"
    :columns="responsiveColumns"
    :column-gap="10"
    :row-gap="10"
  >
    <!-- 内容 -->
  </vue3-waterfall-image>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const responsiveColumns = ref(4)

const updateColumns = () => {
  const width = window.innerWidth
  if (width < 768) {
    responsiveColumns.value = 2
  } else if (width < 1024) {
    responsiveColumns.value = 3
  } else {
    responsiveColumns.value = 4
  }
}

onMounted(() => {
  updateColumns()
  window.addEventListener('resize', updateColumns)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateColumns)
})
</script>
```

## 注意事项

1. **性能优化**: 对于大量数据，建议使用虚拟滚动或分页加载
2. **图片加载**: 图片瀑布流组件会自动处理图片加载和布局更新
3. **动态数据**: 数据变化时会自动重新布局，也可手动调用 `refresh()` 方法
4. **唯一标识**: 确保列表中的每个项目都有唯一的标识字段

## 浏览器支持

- Chrome ≥ 60
- Firefox ≥ 60
- Safari ≥ 12
- Edge ≥ 79

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
