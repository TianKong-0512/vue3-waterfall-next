import { cloneDeep } from 'lodash'

export const contrastTwoArr = (A: any, B: any, key: string) => {
  A = cloneDeep(A)
  B = cloneDeep(B)
  return A.filter((itemA: any) => {
    // 检查是否存在于 B 数据中
    const existsInB = B.some((itemB: any) => itemA[key] === itemB[key])
    // 如果存在于 B 数据中，则从结果中移除
    if (existsInB) {
      // 移除 B 中相同的元素
      const index = B.findIndex((itemB: any) => itemA[key] === itemB[key])
      if (index !== -1) {
        B.splice(index, 1)
      }
      return false
    }
    // 否则保留
    return true
  })
}