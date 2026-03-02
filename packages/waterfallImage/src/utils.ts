import { cloneDeep } from 'lodash'



export const simpleHash = (str: string, length = 6) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 7) - hash) + str.charCodeAt(i)
    hash = Math.abs(hash)
  }
  return hash.toString(36).slice(0, length)
}