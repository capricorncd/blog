/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 09:14
 */
export function $(s, context) {
  return (context || document).querySelector(s)
}
