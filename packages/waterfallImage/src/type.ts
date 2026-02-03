import type { WaterfallProps } from "../../types"

export interface CountData {
  width?: number
  height?: number
  append?: boolean
  onlyid: string
}

export interface WaterfallImgs extends CountData {
  item: any
}


export interface imgClickEvent {
  index: number
  item: any
  imageReact: any
}

export interface ImgViewStateJson {
  append?: boolean
  height?: number
  img: Element
  countData: CountData
}

export interface ImgViewState {
  [key: string]: ImgViewStateJson
}


export interface vue3WaterfallImageProps extends WaterfallProps {
  imgViewBind?: any
  loadEndAppend?: boolean
}