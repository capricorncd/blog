console.log('ajax')

// const url = './ajax-data.json'
const URL = 'http://127.0.0.1:8001'
const TYPE = 'post'

const xhr = new XMLHttpRequest();

xhr.open(TYPE, URL, false)

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      let res = xhr.responseText
      console.log(xhr.getResponseHeader('Token'))
      try {
        res = /^\{/.test(res) ? JSON.parse(res) : res
      } catch (e) {
        console.error(e)
      }
      console.log(res)
    }
  }
}

xhr.setRequestHeader('Token', 'sdkfsklksdffsfsdfs2656dfs6df5s')

xhr.send(JSON.stringify({a: 100}))
