# media-viewer

image/video viewer

```
npm install media-viewer --save-dev
# or
npm i media-viewer -D
```

```javascript
import { MediaViewer } from 'media-viewer'

let arr = [
  {
    thumb: './1.jpg',
    url: './1.mp4',
    type: 2
  },
  {
    thumb: './2.jpg',
    url: './2.jpg',
    type: 1
  }
]

// 参数配置
let options = {
  // ...
}
// 实例化
let mv = new MediaViewer(options, arr)

setTimeout(_ => {
  // 查看第一个元素
  mv.view(0)
}, 2000)
```

## options 参数

|参数|类型|必须|说明|
|:--|:--|:--|:--|
|error|Function|否|错误通知|
|showPagination|Boolean|否|显示pagination, 默认`true`|
|paginationEvent|String|否|触发切换图片事件名称, 默认'mouseover'|
|showThumb|Boolean|否|显示缩略图, 默认`true`|
|thumbPosition|String|否|缩略图显示位置`top`/`bottom`, 默认`bottom`|
|closeOnClickMask|Boolean|否|点击空白处关闭窗口, 默认`true`|

## methods 方法

* view(index, newMediaArray)

  index: `Number`, 必须。查看第`index + 1`张图片或视频。

  newMediaArray: `Array`, 可选。新的媒体url数组。
