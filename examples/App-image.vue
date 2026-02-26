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
import Vue3WaterfallImage from '../packages/waterfallImage'
import { ref } from 'vue'

const imgClick = (e: any) => {
  console.log('点击了图片', e)
}

const list = ref([
  {
    id: 1,
    name: 'N1',
    age: 18,
    src: 'https://img1.baidu.com/it/u=2172818577,3783888802&fm=253&app=138&f=JPEG?w=800&h=1422',
  },
  {
    id: 2,
    name: 'N2',
    age: 19,
    src: 'https://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
  },
  {
    id: 3,
    name: 'N3',
    age: 20,
    src: 'https://img2.baidu.com/it/u=2749040002,2960432688&fm=253&app=138&f=JPEG?w=800&h=1327',
  },
  {
    id: 4,
    name: 'N4',
    age: 21,
    src: 'https://img2.baidu.com/it/u=994110310,1447632438&fm=253&app=138&f=JPEG?w=800&h=1141',
  },
  {
    id: 5,
    name: 'N5',
    age: 22,
    src: 'https://img0.baidu.com/it/u=868307137,3069540477&fm=253&app=138&f=JPEG?w=800&h=1067',
  },
  {
    id: 6,
    name: 'N6',
    age: 23,
    src: 'https://img2.baidu.com/it/u=2294884028,3853138871&fm=253&app=138&f=JPEG?w=800&h=1090',
  },
  {
    id: 7,
    name: 'N7',
    age: 24,
    src: 'https://img1.baidu.com/it/u=325668982,3722091494&fm=253&app=138&f=JPEG?w=800&h=1119',
  },
  {
    id: 8,
    name: 'N8',
    age: 25,
    src: 'https://img2.baidu.com/it/u=3545549520,653252176&fm=253&app=138&f=JPEG?w=1242&h=800',
  },
])
// setTimeout(() => {
//   list.value.splice(5, 0, {
//     id: 9,
//     name: 'N9',
//     age: 26,
//     src: 'https://img2.baidu.com/it/u=3545549520,653252176&fm=253&app=138&f=JPEG?w=1242&h=800',
//   })
// }, 5000)

setTimeout(() => {
  list.value.splice(1, 1)
}, 3000)
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
