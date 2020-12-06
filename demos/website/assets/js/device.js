/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-30 17:51
 */
export function isMacOS() {
  const platform = navigator.platform
  return ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(platform)
}
