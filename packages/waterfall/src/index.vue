<template>
  <div class="waterfall-row" ref="waterfallRow">
    <template
      v-for="(item, index) of list"
      :key="item && props.onlyFiledKey ? item[props.onlyFiledKey] : item ? item : index"
    >
      <div
        class="waterfall-col"
        :data-id="item"
        v-if="
          (props.source == 'waterfall-image' && 'onlyid' in item && item.onlyid) ||
          props.source != 'waterfall-image'
        "
      >
        <div class="waterfall-card">
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: 'vue3-Waterfall',
}
</script>
<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { WaterfallProps } from '../../types'

const props = withDefaults(defineProps<WaterfallProps>(), {
  list: () => [],
  columns: 2,
  columnGap: 10,
  rowGap: 10,
  onlyFiledKey: '',
})

interface waterfallFlow {
  waterfallFlowHeight: Array<number>
  left: number
  rowHeight: number
}

const state: waterfallFlow = reactive({
  waterfallFlowHeight: new Array(Number(props.columns)).fill(0),
  left: Math.floor(100 / Number(props.columns)),
  rowHeight: 0,
})

const initState = () => {
  state.waterfallFlowHeight = new Array(Number(props.columns)).fill(0)
  state.left = Math.floor(100 / Number(props.columns))
  state.rowHeight = 0
}
const waterfallRow = ref()
const waterfallFlowFun = () => {
  initState()
  const dom = waterfallRow.value.querySelectorAll('.waterfall-col')
  dom.forEach((item: any) => {
    item.style.position = 'absolute'
    const minIndex = filterMin()
    item.style.left = `calc(${minIndex * state.left}% + ${Number(props.columnGap)}px)`
    const itemRowGap = Number(props.rowGap) * (state.waterfallFlowHeight[minIndex] == 0 ? 0 : 1)
    item.style.top = state.waterfallFlowHeight[minIndex]! + itemRowGap + 'px'
    state.waterfallFlowHeight[minIndex] +=
      item.querySelector('.waterfall-card').offsetHeight + itemRowGap
  })
  state.rowHeight = getrowHeight()
}
const getrowHeight = () => Math.max.apply(null, state.waterfallFlowHeight)
const filterMin = () => {
  const min = Math.min.apply(null, state.waterfallFlowHeight)
  return state.waterfallFlowHeight.indexOf(min)
}
onMounted(() => {
  nextTick(() => {
    waterfallFlowFun()
  })
})

const refresh = () => {
  nextTick(() => {
    waterfallFlowFun()
  })
}

defineExpose({
  refresh,
})

// const $app = inject('$app') as AppBaseType
// $app.$mitt.on('waterfall-IMG', () => {
//   waterfallFlowFun()
// })
// onUnmounted(() => {
//   $app.$mitt.off('waterfall-IMG')
// })
</script>

<style lang="scss" scoped>
$columnGap: v-bind('props.columnGap');
$columnWidth: v-bind('state.left');
$rowHeight: v-bind('state.rowHeight');
.waterfall-row {
  width: 100%;
  position: relative;
  min-height: calc($rowHeight * 1px);
  display: flex;
  flex-wrap: wrap;
  .waterfall-col {
    width: calc($columnWidth * 1% - $columnGap * 1px);
    .waterfall-card {
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-top: 0 !important;
    }
  }
}
</style>
