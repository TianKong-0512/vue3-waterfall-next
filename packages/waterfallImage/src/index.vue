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
        <template v-if="item && item.onlykey">
          <slot name="header" :item="item" :index="index"> </slot>
          <div
            class="img-view"
            :style="{
              height: `${imgViewState[item.onlykey]?.height || 0}px`,
            }"
            v-bind="$props.imgViewBind"
          >
            <div
              class="slot-img"
              :ref="(el) => slotImageRefSet(item, el)"
              :key="item.onlykey"
              @click.prevent.stop="
                $emit('imgClick', { index, item, imageReact: imgViewState[item.onlykey] })
              "
            ></div>
            <!-- {{ appendImage(item) }} -->
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
import type {
  CountData,
  ImgViewState,
  WaterfallImgs,
  WaterfallImgsKeyJson,
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
  onlyFiledKey: 'id',
})

watch([() => props.columns, () => props.columnGap, () => props.rowGap], (newVl) => {
  const existNaN = newVl.some((vl) => isNaN(Number(vl)))
  if (!existNaN) {
    handleResize()
  }
})

watch(
  () => props.list.map((item) => item),
  (newVl, oldVl) => {
    const newOnlyKeys = newVl.map((item) => item[props.onlyFiledKey]).join(',')
    const oldOnlyKeys = oldVl.map((item) => item[props.onlyFiledKey]).join(',')
    if (newOnlyKeys == oldOnlyKeys) {
      return
    }
    if (!(newVl instanceof Array)) {
      newVl = []
    }
    loadImages(newVl)
  },
  {
    deep: true,
  },
)

const waterfallImageMain = ref()
const waterfallImgs = ref<WaterfallImgs[] | any[]>([])
const imgViewState: ImgViewState = reactive({})
onMounted(() => {
  loadImages()
})

const slotImageRef: any = {}
const slotImageRefSet = (item: any, el: any) => {
  if (!el) {
    return
  }
  slotImageRef[item.onlykey] = el
  nextTick(() => {
    appendImage(item)
  })
}

const appendImage = (item: any) => {
  nextTick(() => {
    setTimeout(() => {
      if (!slotImageRef[item.onlykey]) {
        return
      }
      if (imgViewState[item.onlykey]!.append) {
        slotImageRef[item.onlykey].innerHTML = ''
      }
      imgViewState[item.onlykey]!.append = true
      const container = document.createElement('div')
      container.appendChild(imgViewState[item.onlykey]!.img)
      slotImageRef[item.onlykey].appendChild(container)
    }, 100)
  })
}

const getIamgeWidth = () => {
  const gapWidth = (Number(props.columns) + 1) * Number(props.columnGap)
  return (waterfallImageMain.value.offsetWidth - gapWidth) / Number(props.columns)
}

const getImageData = (onlykey: string, img: HTMLImageElement, imgWidth: number): CountData => {
  const ratio = img.width / imgWidth
  const countData: CountData = {
    width: img.width,
    height: img.height,
    onlykey,
  }
  imgViewState[onlykey] = {
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
  imageJosn: WaterfallImgsKeyJson,
  imageItem?: any,
  index?: number,
) => {
  if (props.loadEndAppend) {
    if (loadIndex >= list.length) {
      waterfallImgs.value = []
      if (imageJosn) {
        props.list.forEach((item: any) => {
          const onlykey = `${item[props.onlyFiledKey]}`
          if (imageJosn && item[onlykey] && imageJosn[onlykey]) {
            waterfallImgs.value.push(imageJosn[onlykey]!)
          }
        })
      }
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
  if (!list) list = props.list
  let loadIndex = 0
  const imgWidth = getIamgeWidth()
  const imageJosn: WaterfallImgsKeyJson = {}
  const existImages: WaterfallImgsKeyJson = {}
  waterfallImgs.value.forEach((item) => {
    existImages[item.onlykey] = item
  })

  const removeOnlyid: string[] = waterfallImgs.value.map((item) => item.onlykey)
  list.forEach((item: any) => {
    const onlykey = `${item[props.onlyFiledKey]}`
    const ofIndex = removeOnlyid.indexOf(onlykey)
    if (ofIndex !== -1) {
      removeOnlyid.splice(ofIndex, 1)
    }
  })

  const removeHandle = () => {
    if (loadIndex >= list.length) {
      if (removeOnlyid.length) {
        waterfallImgs.value = waterfallImgs.value.filter(
          (item) => !removeOnlyid.includes(item.onlykey),
        )
      }
      return
    }
    waterfallRefresh()
  }

  list.forEach((item: any, index: number) => {
    const onlykey = `${item[props.onlyFiledKey]}`
    if (existImages[onlykey]) {
      imageJosn[onlykey] = existImages[onlykey]
      loadIndex++
      removeHandle()
      return
    } else {
      waterfallImgs.value.splice(index, 0, { onlykey: '', item: null })
      imageJosn[onlykey] = null
    }
    const img = new Image()
    img.src = item.src
    img.onload = () => {
      const countData = getImageData(onlykey, img, imgWidth)
      const imageItem = { ...countData, item }
      imageJosn[onlykey] = imageItem
      loadIndex = loadEndHandle(loadIndex, list, imageJosn, imageItem, index)
      removeHandle()
    }
    img.onerror = () => {
      imageJosn[onlykey] = null
      loadIndex = loadEndHandle(loadIndex, list, imageJosn)
      removeHandle()
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
      waterfallImgs.value.forEach((item) => {
        const ratio = item.width / imgWidth
        if (imgViewState[item.onlykey]) {
          imgViewState[item.onlykey]!.height = Math.floor(item.height / ratio)
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
