export interface WaterfallProps {
  list: any[]
  columns: number | string
  columnGap: number | string
  rowGap: number | string
  onlyFiledKey?: string
  source?: string
}