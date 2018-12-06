# Vue

https://cn.vuejs.org/

## # 模板语法

https://cn.vuejs.org/v2/guide/syntax.html

### # 插值

```
<!--文本-->
<div>{{ msg }}</div>

<!--原始html-->
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive:
  <span v-html="rawHtml"></span>
</p>

<!--特性-->
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>

<!--使用 JavaScript 表达式-->
{{ num + 1 }} {{ isOk ? 'yes' : 'no' }} {{ [1, 5, 3].join(',') }}
```

### # 指令

```
<p v-if="seen">现在你看到我了</p>

<!--参数-->
<a v-bind:href="url">...</a>
<a v-on:click="doSomething">...</a>

<!--修饰符-->
<form v-on:submit.prevent="onSubmit">...</form>
```

#### 自定义指令

实用场景：需要处理的数据不至于使用一个组件来处理，同时用表达式又不能解决的事情。

```
<script>
import Vue from 'vue'

Vue.directive('pow', {
  bind (el, binding) {
    el.textContent = Math.pow(binding.value, 2)
  },
  update (el, binding) {
    el.textContent = Math.pow(binding.value, 2)
  }
})
</script>

<template>
  <div v-pow="5"></div>
  <!--结果25-->
</template>
```

## # 计算属性

https://cn.vuejs.org/v2/guide/computed.html

```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

### # 计算属性的 setter

```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

## # 侦听器 watch

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

https://cn.vuejs.org/v2/api/#vm-watch

## # Class 与 Style 绑定

对象语法：适合较多的class名或者动态的class

```
<div v-bind:class="{ active: isActive }"></div>

<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```

数组语法：适合较少的class名

### # 绑定内联样式

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```
<div v-bind:style="styleObject"></div>
```

```
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

## # 条件渲染&列表渲染

https://cn.vuejs.org/v2/guide/conditional.html

### # 基本用法

if else，for 的模板处理方式


```
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```

### # 分组用法

复杂模板的分组条件处理的方式

在 <template> 元素上使用 v-if 条件渲染分组

```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### # 用 key 管理可复用的元素

```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```


## # 事件处理

定义&缩写：事件的定义及缩写

内联写法：事件传参和事件对象

事件修饰符：快速结合键盘事件提升效率

### # 监听事件

```
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

### # 事件处理方法

```
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```

```
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
```

### # 内联处理器中的方法

```
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

### # 事件修饰符

event.preventDefault() 或 event.stopPropagation()

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

#### # once

```
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

### # 按键修饰符

```
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">

<!-- 同上 -->
<input v-on:keyup.enter="submit">

<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

```
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
```

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

https://cn.vuejs.org/v2/guide/events.html

### # 鼠标按钮修饰符

```
.left
.right
.middle
```

## # 表单输入绑定

https://cn.vuejs.org/v2/guide/forms.html

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### # 修饰符

```
<!--如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：-->
<input v-model.trim="msg">
```

## # 深入了解组件

* props

组件的参数传递

https://cn.vuejs.org/v2/guide/components-props.html

* slot

https://cn.vuejs.org/v2/guide/components-slots.html

* 自定义事件

https://cn.vuejs.org/v2/guide/components-custom-events.html

# Vue-router

https://router.vuejs.org/

