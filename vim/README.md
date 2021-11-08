# Vim

设计理念：尽量使手不离开键盘，以免影响开发者思路。

## 命令模式

拷贝、删除、粘贴等，通过i/a等键切换到编辑模式

## 编辑模式

编辑字符，通过Esc键进行切换

## 创建文件

```shell
vim filename
```

保存文件：`:w`，关闭文件：`:q`，保存并关闭：`:wq`

退出不保存：`:q!`

```shell
# 查看文本内容
cat filename.txt
```

## 拷贝、删除、粘贴

`yy` 拷贝一行
`yw` 拷贝一个词

`p` 粘贴

`dd` 删除一行
`dw` 删除一个word

注意：仅在命令模式下有效。编辑模式下按Esc键可进入命令模式。

## 移动光标

`h/j/k/l` 左下上右

`gg` 跳到文件头

`G` 跳到文件尾

`^` 移动至行首
`$` 至行尾
`w/2w` 向前移动一词/两词（以此类推）
`b/2b` 向后移动一词/两词

## Find and Replace

`/keyword` find；查找下一个匹配使用`n`；上一个`shift+n`。

`:%s/keyword/替换字/gc` 查找与替换。`%`整篇文档的所有行；`s`search；`keyword`关键字或正则表达式；`替换字`替换字或正则表达式；`g`全局，`c`每次替换都需要确认。

`:10,13s/keyword/替换字/gc` 只查找或替换第10-13行的内容。

## show line number

```shell
:set number
```

## 多窗口

`:split`/`:vsplit` 横向或纵向分割窗口。

`ww`/`w[hjkl]` 窗口间的跳转。

`:close` 关闭窗口。

## C语言代码高亮

```shell
:syntax on
```

编译C语言代码

```shell
# Mac
clang -g -o HelloWorld HelloWorld.c
```

执行编译后的文件

```shell
./HelloWorld
```
