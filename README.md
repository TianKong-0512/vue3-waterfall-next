# 🚀 Vue3 瀑布流组件

### 🎯 立即体验

**[👉 GitHub项目地址](https://github.com/TianKong-0512/vue3-waterfall-next)**

**[📦 NPM包地址](https://www.npmjs.com/package/vue3-waterfall-next)**

```bash
npm install vue3-waterfall-next
# 或
yarn add vue3-waterfall-next
```

## 📖 API 文档

### Waterfall 组件

| 属性           | 类型             | 默认值 | 说明        |
| -------------- | ---------------- | ------ | ----------- |
| `list`         | `any[]`          | `[]`   | 数据列表    |
| `columns`      | `number\|string` | `2`    | 列数        |
| `columnGap`    | `number\|string` | `10`   | 列间距 (px) |
| `rowGap`       | `number\|string` | `10`   | 行间距 (px) |
| `onlyFiledKey` | `string`         | `'id'` | 唯一键字段  |

### WaterfallImages 组件

| 属性            | 类型             | 默认值  | 说明                           |
| --------------- | ---------------- | ------- | ------------------------------ |
| `list`          | `any[]`          | `[]`    | 图片数据列表                   |
| `columns`       | `number\|string` | `2`     | 列数                           |
| `columnGap`     | `number\|string` | `10`    | 列间距 (px)                    |
| `rowGap`        | `number\|string` | `10`    | 行间距 (px)                    |
| `onlyFiledKey`  | `string`         | `'id'`  | 数组唯一标识字段               |
| `imgViewBind`   | `any`            | `{}`    | 图片容器绑定属性               |
| `loadEndAppend` | `boolean`        | `false` | 是否在图片全部加载完成后再显示 |

### 事件

| 事件名     | 参数                          | 说明         |
| ---------- | ----------------------------- | ------------ |
| `imgClick` | `{ index, item, imageReact }` | 图片点击事件 |

### Slots

### Waterfall 组件

| 名称      | 说明                         |
| --------- | ---------------------------- |
| `default` | 默认槽槽，用于渲染每个项内容 |

### WaterfallImages 组件

| 名称      | 说明                                        |
| --------- | ------------------------------------------- |
| `default` | 默认槽槽，用于渲染每个项内容(item, index)   |
| `header`  | 头部槽槽，用于渲染每个项的头部(item, index) |
| `footer`  | 底部槽槽，用于渲染每个项的底部(item, index) |

## 🚀 3分钟极速上手

### 🎯 场景1：电商商品展示（万能瀑布流）

```vue
<template>
  <!-- 🔥 一行代码，商品展示瞬间高大上！ -->
  <vue3-Waterfall :list="productList" :columns="isMobile ? 2 : 4">
    <template #default="{ item }">
      <div class="product-card" @click="goToDetail(item)">
        <img :src="item.image" :alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p class="price">¥{{ item.price }}</p>
        <button class="buy-btn">立即购买</button>
      </div>
    </template>
  </vue3-Waterfall>
</template>

<script setup>
import { vue3Waterfall } from 'vue3-waterfall-next'
import { ref } from 'vue'

const productList = ref([
  { id: 1, name: '时尚T恤', price: 99, image: 'tshirt.jpg' },
  { id: 2, name: '运动鞋', price: 299, image: 'shoes.jpg' },
  // ... 你的商品数据
])

const isMobile = ref(window.innerWidth <= 768)

const goToDetail = (product) => {
  // 跳转到商品详情页
  console.log('查看商品:', product.name)
}
</script>
```

### 📸 场景2：图片社交应用（智能图片瀑布流）

```vue
<template>
  <!-- 📸 支持任意尺寸图片，上传什么都能完美展示！ -->
  <vue3-Waterfall-Image
    :list="photoList"
    :columns="3"
    :columnGap="10"
    :rowGap="10"
    @imgClick="previewImage"
  >
    <template #default="{ item }">
      <!-- 自定义图片覆盖层 -->
      <div class="photo-overlay">
        <span class="likes">❤️ {{ item.likes }}</span>
        <span class="comments">💬 {{ item.comments }}</span>
      </div>
    </template>
  </vue3-Waterfall-Image>
</template>

<script setup>
import { vue3WaterfallImage } from 'vue3-waterfall-next'
import { ref } from 'vue'

const photoList = ref([
  { id: 1, src: 'photo1.jpg', likes: 128, comments: 23 },
  { id: 2, src: 'photo2.jpg', likes: 256, comments: 45 },
  // ... 用户上传的图片（无需宽高信息！）
])

const previewImage = (index) => {
  console.log('预览第', index + 1, '张图片')
  // 打开图片预览弹窗
}
</script>
```

## ✨ 让开发者尖叫的功能亮点

### 🎯 **真正的零配置**

```vue
<!-- ✅ 我们的组件：上传什么图片都能完美展示 -->
<vue3WaterfallImage :list="images" />
```

### 📱 **一套代码，全端适配**

```vue
<template>
  <!-- 📱 手机: 2列 | 💻 平板: 3列 | 🖥️ 电脑: 4列 -->
  <vue3-Waterfall
    :list="contentList"
    :columns="getResponsiveColumns()"
    :columnGap="getResponsiveGap()"
  />
</template>

<script setup>
const getResponsiveColumns = () => {
  const width = window.innerWidth
  if (width <= 480) return 2 // 📱 手机
  if (width <= 768) return 3 // 📱 平板
  if (width <= 1024) return 4 // 💻 小屏电脑
  return 5 // 🖥️ 大屏电脑
}
</script>
```

### 🎨 **无限定制可能**

```vue
<vue3-Waterfall
  :list="data"
  :columns="3"
  :columnGap="15"           <!-- 列间距 -->
  :rowGap="20"              <!-- 行间距 -->
  :type="'image'"           <!-- 渲染模式 -->
  onlyFiledKey="uid"              <!-- 唯一标识字段 -->
>
  <!-- 🎨 完全自定义每个项目的外观 -->
  <template #default="{ item, index }">
    <div class="my-custom-card" :style="{ background: item.color }">
      <component :is="getComponentType(item)" :data="item" />
      <transition name="fade">
        <div v-if="item.hover" class="overlay">
          <button @click="handleAction(item, index)">操作</button>
        </div>
      </transition>
    </div>
  </template>
</Waterfall>
```

## 🚀 立即开始你的瀑布流之旅

### 📦 安装（30秒完成）

```bash
# npm
npm install vue3-waterfall-next

# yarn
yarn add vue3-waterfall-next

# pnpm
pnpm add vue3-waterfall-next
```

### ⚡ 快速集成（2分钟搞定）

**方式1：全局注册（推荐）**

```typescript
// main.ts
import { createApp } from 'vue'
import Vue3Waterfall from 'vue3-waterfall-next'
import 'vue3-waterfall-next/dist/style.css'

const app = createApp(App)
app.use(Vue3Waterfall)
app.mount('#app')
```

**方式2：按需引入（优化包体积）**

```typescript
// 在组件中引入
import { vue3Waterfall, vue3WaterfallImage } from 'vue3-waterfall-next'
import 'vue3-waterfall-next/dist/style.css'

export default {
  components: {
    vue3Waterfall,
    vue3WaterfallImage,
  },
}
```

### 🎯 开始使用（30秒见效）

```vue
<template>
  <!-- 🎉 恭喜你！瀑布流布局已经完成！ -->
  <vue3Waterfall :list="myData" :columns="3" />
</template>

<script setup>
const myData = ref([
  { id: 1, content: '第一块内容' },
  { id: 2, content: '第二块内容' },
  // ... 你的数据
])
</script>
```

## 📞 全方位支持

| 支持渠道          | 联系方式                                                                |
| ----------------- | ----------------------------------------------------------------------- |
| **GitHub Issues** | [提交问题](https://github.com/TianKong-0512/vue3-waterfall-next/issues) |
| **CSDN私信**      | 关注后私信                                                              |
| **邮箱咨询**      | 1219164581@qq.com                                                       |

---

<div align="center">

## 🎯 **还在等什么？立即体验丝滑瀑布流！**

```bash
npm install vue3-waterfall-next
```

### ⭐ **Star支持项目发展，获取更多高级功能！**

**[👉 GitHub项目地址](https://github.com/TianKong-0512/vue3-waterfall-next)**

**[📦 NPM包地址](https://www.npmjs.com/package/vue3-waterfall-next)**

</div>

---

## 📈 总结

本文介绍了一个功能完整的 Vue3 瀑布流组件库的实现。通过合理的架构设计和算法优化，组件具有良好的性能和扩展性。关键要点：

1. **算法核心**: 采用"最短列优先"算法，确保布局平衡
2. **性能优化**: 防抖处理、按需加载、响应式设计
3. **TypeScript**: 完整的类型支持，提升开发体验
4. **可扩展性**: 支持自定义插槽，易于集成其他功能
