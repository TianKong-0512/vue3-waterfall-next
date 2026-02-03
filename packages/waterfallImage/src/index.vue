<template>
  <div class="water-fall-image-main" ref="waterfallImageMain">
    <vue3Waterfall
      ref="vue3WaterfallRef"
      v-if="waterfallImgs.length > 0"
      :list="waterfallImgs"
      :columns="props.columns"
      :columnGap="props.columnGap"
      :rowGap="props.rowGap"
      source="waterfall-image"
      only-filed-key="src"
    >
      <template #default="{ item, index }">
        <template v-if="item && item.onlyid">
          <slot name="header" :item="item" :index="index"> </slot>
          <div
            class="img-view"
            :style="{
              height: `${imgViewState[item.onlyid]?.height || 0}px`,
            }"
            v-bind="$props.imgViewBind"
          >
            {{ !imgViewState[item.onlyid]?.append ? appendImage(item) : '' }}
            <div
              class="slot-img"
              :ref="(el) => slotImageRefSet(item.onlyid, el)"
              @click.prevent.stop="
                $emit('imgClick', { index, item, imageReact: imgViewState[item.onlyid] })
              "
            ></div>
            <slot :item="item" :index="index"> </slot>
          </div>
          <slot name="footer" :item="item" :index="index"> </slot>
        </template>
      </template>
    </vue3Waterfall>
  </div>
</template>
<script lang="ts">
export default {
  name: 'vue3-Waterfall-Image',
}
</script>
<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import vue3Waterfall from '../../waterfall/src/index.vue'
import { contrastTwoArr } from './utils'
import { cloneDeep } from 'lodash'
import type {
  CountData,
  ImgViewState,
  WaterfallImgs,
  imgClickEvent,
  vue3WaterfallImageProps,
} from './type'

const $emit = defineEmits<{
  imgClick: [imgClickEvent]
}>()

const props = withDefaults(defineProps<vue3WaterfallImageProps>(), {
  list: () => [],
  columns: 2,
  columnGap: 10,
  rowGap: 10,
  imgViewBind: () => ({}),
  loadEndAppend: false,
})

watch([() => props.columns, () => props.columnGap, () => props.rowGap], (newVl) => {
  const existNaN = newVl.some((vl) => isNaN(Number(vl)))
  if (!existNaN) {
    handleResize()
  }
})

watch(
  () => cloneDeep(props.list),
  (newVl, oldVl) => {
    if (newVl < oldVl) {
      return
    }
    const appendList = contrastTwoArr(newVl, oldVl, 'src')
    loadImages(appendList)
  },
)

const waterfallImageMain = ref()
const waterfallImgs = ref<WaterfallImgs[] | any[]>([])
const imgViewState: ImgViewState = reactive({})
onMounted(() => {
  loadImages()
})

const slotImageRef: any = {}
const slotImageRefSet = (onlyid: string, el: any) => {
  slotImageRef[onlyid] = el
}

const appendImage = (item: any) => {
  nextTick(() => {
    imgViewState[item.onlyid]!.append = true
    const container = document.createElement('div')
    container.appendChild(imgViewState[item.onlyid]!.img)
    slotImageRef[item.onlyid].appendChild(container)
  })
}

const getIamgeWidth = () => {
  const gapWidth = (Number(props.columns) + 1) * Number(props.columnGap)
  return (waterfallImageMain.value.offsetWidth - gapWidth) / Number(props.columns)
}

const getImageData = (onlyid: string, img: HTMLImageElement, imgWidth: number): CountData => {
  const ratio = img.width / imgWidth
  const countData: CountData = {
    width: img.width,
    height: img.height,
    onlyid,
  }
  imgViewState[onlyid] = {
    countData,
    height: img.height / ratio,
    img,
    append: false,
  }
  return countData
}

/**
 * 加载图片处理
 * @param loadIndex
 * @param list
 * @param appendImage
 */
const loadEndHandle = (
  loadIndex: number,
  list: any[],
  appendImage: WaterfallImgs[],
  imageItem?: any,
  index?: number,
) => {
  if (props.loadEndAppend) {
    if (loadIndex >= list.length) {
      waterfallImgs.value.push(...appendImage)
      waterfallRefresh()
    }
  } else {
    waterfallImgs.value[index!] = imageItem
    waterfallRefresh()
  }
  loadIndex++
  return loadIndex
}

const loadImages = (list?: any[]) => {
  waterfallImgs.value = []
  if (!list) list = props.list
  let loadIndex = 0
  const imgWidth = getIamgeWidth()
  const appendImage: any[] = []
  list.forEach((item: any, index: number) => {
    const onlyid = crypto.randomUUID()
    waterfallImgs.value.push({ onlyid: '', item: null })
    appendImage.push(null)
    const img = new Image()
    img.src = item.src
    img.onload = () => {
      const countData = getImageData(onlyid, img, imgWidth)
      const imageItem = { ...countData, item }
      appendImage[index] = imageItem
      loadIndex = loadEndHandle(loadIndex, list, appendImage, imageItem, index)
    }
    img.onerror = () => {
      appendImage[index] = false
      loadIndex = loadEndHandle(loadIndex, list, appendImage)
    }
  })
}

const vue3WaterfallRef = ref()
const waterfallRefresh = () => {
  nextTick(() => {
    vue3WaterfallRef.value.refresh()
  })
}

const handleResize = () => {
  nextTick(() => {
    setTimeout(() => {
      const imgWidth = getIamgeWidth()
      console.log('imgWidth', imgWidth)
      waterfallImgs.value.forEach((item) => {
        const ratio = item.width / imgWidth
        if (imgViewState[item.onlyid]) {
          imgViewState[item.onlyid]!.height = Math.floor(item.height / ratio)
        }
      })
      waterfallRefresh()
    }, 16.7)
  })
}

const imageMainWidth = ref(0)
// 监听元素尺寸变化（包括 offsetWidth）
const watchOffsetWidth = (element: any, callback: (newOffsetWidth: number) => void) => {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const w = entry.contentRect.width
      if (w !== imageMainWidth.value) {
        imageMainWidth.value = entry.contentRect.width
        callback(w)
      }
    }
  })

  observer.observe(element)
  return observer
}

let observer: ResizeObserver | null = null
onMounted(() => {
  observer = watchOffsetWidth(waterfallImageMain.value, () => {
    handleResize()
  })
})

onUnmounted(() => {
  observer && observer.disconnect()
})
</script>
<style lang="scss" scoped>
.water-fall-image-main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.img-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .slot-img {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  & > :deep(*:not(.slot-img)) {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}

:deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
