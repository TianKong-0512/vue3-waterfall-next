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
import { onMounted, reactive, toRefs, ref, inject } from 'vue'

onMounted(() => {
  console.log('初始化')
})

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
