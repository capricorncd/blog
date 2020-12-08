/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-08 20:15
 */
export default function ({ req, route, redirect }) {
  console.log(req && req.headers)
  if (req) {
    let path = route.path.substr(1)
    // console.log('path: ' + path)
    if (isMobile(req.headers['user-agent'])) {
      if (path === '' || path === 'contact-us') {
        return redirect('/mobile')
      }
    } else if (path === 'mobile') {
      return redirect('/')
    }
  }
}


function isMobile (userAgent) {
  return /(android|iphone|symbianos|ipod|ipad|windows phone)/i.test(userAgent)
}
