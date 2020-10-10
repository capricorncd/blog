/**
 * Created by Capricorncd 2018/3/15
 * https://github.com/capricorncd
 */
var d = document

function Vdom () {

}

// 创建dom节点
Vdom.prototype.createDomNode = function (vnode) {
  if (typeof vnode === 'string') return d.createTextNode(vnode)
  var tag = vnode.tag
  var attrs = vnode.attrs || {}
  var children = vnode.children || []
  if (!tag) return null
  var me = this
  var el = d.createElement(tag)
  // attrs
  var attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      el.setAttribute(attrName, attrs[attrName])
    }
  }
  // children
  children.forEach(function (item) {
    el.appendChild(me.createDomNode(item))
  })
  return el
}

Vdom.prototype.patch = function (container, vnode) {
  if (typeof container === 'string') {
    var el = d.querySelector(container)
    if (el) {
      el.appendChild(this.createDomNode(vnode))
    } else {
      console.error(container + '对应的Dom节点不存在！')
    }
  } else {
    this.contrastVirtualNode(container, vnode)
  }
}

// 对比新旧虚拟节点
Vdom.prototype.contrastVirtualNode = function (vnode, newVnode) {
  var me = this
  // 共同的父节点
  var parentNode = d.querySelector(vnode.tag)
  var children = vnode.children || []
  var newChildren = newVnode.children || []
  children.forEach(function (item, index) {
    var newChild = newChildren[index]
    // 无新虚拟节点，则删除旧的
    if (!newChild) {
      me.removeDomNode(item, parentNode)
      return true
    }
    // 文本
    if (typeof newChild === 'string') {
      if (newChild !== item) {
        me.updateDomNode(item, newChild, parentNode)
      }
    } else if (newChild.tag === item.tag) {
      // 对比属性
      me.contrastAttribute(item.attrs || {}, newChild.attrs || {})
      me.contrastVirtualNode(item, newChild)
    } else {
      me.updateDomNode(item, newChild, parentNode)
    }
  })
}

Vdom.prototype.contrastAttribute = function (attrs, newAttrs) {
  var key
  for (key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      if (attrs[key] !== newAttrs[key]) {

      }
    }
  }
}

// 更新dom节点
Vdom.prototype.updateDomNode = function (node, newNode, context) {
  this.removeDomNode(node, context)
  context.appendChild(this.createDomNode(newNode))
}

// 移除Dom节点
Vdom.prototype.removeDomNode = function (nodeData, context) {
  if (typeof nodeData === 'string') {
    context.removeChild(this.createDomNode(nodeData))
  } else {
    var rmNode = context.querySelector(nodeData.tag)
    context.removeChild(rmNode)
  }
}
