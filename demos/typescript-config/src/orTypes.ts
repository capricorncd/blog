/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-08-22 18:31
 */
let width: number | undefined

/** ? 可选参数，不传参时即undefined */
// 相当于 sting | undefined
function getName(name?: string) {
  return name || '匿名'
}

getName('Jock')
getName(void 0)
// getName(null) // error

/** any */
let value: any
value = 3
value = void 0
value = null
value = 'Tom'
value = {
  key: 'key'
}
value = []
