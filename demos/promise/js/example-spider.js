// 开发一个爬虫，抓取某网站内容

// spider 方法自己实现

let URLS = ['http://blog.meathill.com']

function fetchAll (urls) {
  return urls.reduce(function (promise, url) {
    return promise.then(function () {
      return fetch(url)
    })
  }, Promise.resolve())
}

function fetch (url) {
  return spider.fetch(url)
    .then(function (content) {
      return saveOrOther(content)
    })
    .then(function (content) {
      let links = spider.findLinks(content)
      return fetchAll(links)
    })
}

fetchAll(URLS)
