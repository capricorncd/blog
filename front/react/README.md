# React

### 性能优化

将变的部分与不变的部分分离

1. props(父组件state传给子组件则成为了子组件的props)
2. state(衍生出1和3)
3. context(state传入context中，可能就成了某个子/孙组件的context)

