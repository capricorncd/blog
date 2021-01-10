import * as Types from '../types/index'

/**
 * is number like
 * @param str
 */
export function isNumberLike(str: string): boolean {
  return /^-?(\d+|\d+\.\d+)$/.test(str)
}

/**
 * to number
 * @param str
 */
export function toNumber(str: number | string): number {
  if (typeof str === 'number') return str
  const num = parseFloat(str)
  return isNaN(num) ? 0 : num
}

/**
 * handle query value
 * @param str
 */
function handleQueryValue(str: string): any {
  if (str === 'null') return null
  if (str === 'undefined') return undefined
  if (isNumberLike(str)) return toNumber(str)
  try {
    return JSON.parse(str)
  } catch (e: any) {
    return str
  }
}

/**
 * get location queries
 */
export function getQuery(): Types.IAnyObject {
  const result: Types.IAnyObject = {}
  const search: string | undefined = location.search.split('?').pop()

  if (!search) return result

  let _key: string
  let _val: any
  search.split('&').forEach((item: string) => {
    [_key, _val] = item.split('=')
    result[_key] = handleQueryValue(_val)
  })
  return result
}
