# React 15.0.2

**React** 是一个用于构建用户界面的JavaScript库。

React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。

## React 中的数据

#### state

组件本身的数据

#### props

从其他组件传入的数据

## React生命周期

#### getDefaultProps

#### getInitialState

#### componentWillMount

#### render

#### componentDidMount

相当与Dom Ready

#### componentWillUnmount

## React组件间的通信

widget->(props)->widget->(props)->widget

parent<-widget

widget1<-->(parent)<-->widget2

不可取方法：先将数据传递给公共父组件，再将从父组件将数据传递给widget2/widget1

widget1<-->widget2

可取方法：事件订阅

https://github.com/mroderick/PubSubJS

## 备注

笔记作者：capricorncd

主页：https://github.com/capricorncd


