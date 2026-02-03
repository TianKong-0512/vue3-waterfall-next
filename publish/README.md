# vue3-waterfall-next

安装：

```bash
npm install vue3-waterfall-next
```

无图片 - demo:

```Vue
<template>
  <div>
    <vue3-Waterfall ref="waterfallRow" :list="list" :columns="3" :columnGap="10" :rowGap="10">
      <template #default="{ item }">
        <div class="test-waterfall" :style="{ height: item.height + 'px' }">{{ item.name }}</div>
      </template>
    </vue3-Waterfall>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const list = ref([
  {
    id: 1,
    name: '张三',
    age: 18,
    height: 100,
  },
  {
    id: 2,
    name: '李四',
    age: 19,
    height: 110,
  },
  {
    id: 3,
    name: '王五',
    age: 20,
    height: 120,
  },
  {
    id: 4,
    name: '赵六',
    age: 21,
    height: 90,
  },
  {
    id: 5,
    name: '钱七',
    age: 22,
    height: 130,
  },
  {
    id: 6,
    name: '孙八',
    age: 23,
    height: 80,
  },
  {
    id: 7,
    name: '周九',
    age: 24,
    height: 60,
  },
  {
    id: 8,
    name: '郑十',
    age: 25,
    height: 100,
  },
])
</script>
<style lang="scss" scoped>
.test-waterfall {
  width: 100%;
  height: 100px;
  background-color: #f00;
  border-radius: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

```

```
list:列表（必填）
columns:几列（默认3列）
columnGap:列间距（默认10px）
rowGap:行间距（默认10px）
```

图片 - demo:

```Vue
<template>
  <div>
    <vue3-Waterfall-Image
      ref="waterfallRow"
      :list="list"
      :columns="3"
      :columnGap="10"
      :rowGap="10"
      @imgClick="imgClick"
    >
      <template #header="{ item }">
        <div class="test-waterfall">
          {{ item.item.name }}
        </div>
      </template>
      <template #footer="{ item }">
        <div class="test-waterfall">
          {{ item.item.name }}
        </div>
      </template>
    </vue3-Waterfall-Image>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  console.log('初始化')
})

const imgClick = (e: any) => {
  console.log('点击了图片', e)
}

const list = ref([
  {
    id: 1,
    name: '张三',
    age: 18,
    src: '图片地址',
  },
  {
    id: 2,
    name: '李四',
    age: 19,
    src: '图片地址',
  },
  {
    id: 3,
    name: '王五',
    age: 20,
    src: '图片地址',
  },
  {
    id: 4,
    name: '赵六',
    age: 21,
    src: '图片地址',
  },
  {
    id: 5,
    name: '钱七',
    age: 22,
    src: '图片地址',
  },
  {
    id: 6,
    name: '孙八',
    age: 23,
    src: '图片地址',
  },
  {
    id: 7,
    name: '周九',
    age: 24,
    src: '图片地址',
  },
  {
    id: 8,
    name: '郑十',
    age: 25,
    src: '图片地址',
  },
])
</script>

<style lang="scss" scoped>
.test-waterfall {
  width: 100%;
  background-color: #f00;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

```

```
list:列表（必填）
columns:几列（默认3列）
columnGap:列间距（默认10px）
rowGap:行间距（默认10px）
imgViewBind: 图片view的 bind 数据
loadEndAppend: 是否全部图片加载完成后在渲染（默认false）
```
