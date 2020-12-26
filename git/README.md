# git

```shell-js
# 查看用户名:
git config user.name

# 切换用户
git config --global user.name "xxx"

# 切换邮箱
git config --global user.email "xxx"
```

## 修改提交历史中的author信息1

#### 当次提交
当次的提交显示指定提交者信息：

```shell-js
git commit -m "Initial commit" --author="mn <mn@furzoom.com>"
```

#### 修改上次提交
修改已经提交的commit的信息：

```shell-js
git commit --amend --author="mn <mn@furzoom.com>"
```

#### 修改历史提交
如果是上几次的提交呢？可以利用rebase来实现，如：
```shell-js
git rebase -i orgin/master
```

在列表中将开头的pick修改为edit，然后重复执行以下命令直到完成：

```shell-js
git commit --amend --author="mn <mn@furzoom.com>"
git rebase --continue
```

#### 修改所有的提交
与上面的不同在于，不能再使用特定的commit id，使用
```shell-js
git rebase -i --root
```

## 修改提交历史中的author信息2

```shell-js
# 第一步，（n）代表提交次数
git rebase -i HEAD~n
# 第二步
然后按`i`编辑，把`pick` 改成 `edit`，按'Esc'退出编辑，按`:wq`保存退出
# 第三步
git commit --amend --author="作者 <邮箱@xxxx.com>" --no-edit
# 第四步
git rebase --continue
# 第五步
git push --force
```