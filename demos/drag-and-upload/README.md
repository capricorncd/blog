# Drag image and upload

![Preview](preview.png)

ondrag 事件在元素或者选取的文本被拖动时触发。

拖放是 HTML5 中非常常见的功能。 更多信息可以查看我们 HTML 教程中的 HTML5 拖放。
注意：为了让元素可拖动，需要使用 HTML5 draggable 属性。

提示：链接和图片默认是可拖动的，不需要 draggable 属性。

## 在拖放的过程中会触发以下事件

#### # 在拖动目标上触发事件 (源元素):

ondragstart - 用户开始拖动元素时触发

ondrag - 元素正在拖动时触发

ondragend - 用户完成元素拖动后触发

#### #释放目标时触发的事件:

ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件

ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件

ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件

ondrop - 在一个拖动过程中，释放鼠标键时触发此事件

注意： 在拖动元素时，每隔 350 毫秒会触发 ondrag 事件。
