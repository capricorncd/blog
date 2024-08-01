# git

```bash
# 查看用户名:
git config user.name

# 切换用户
git config --global user.name "xxx"

# 切换邮箱
git config --global user.email "xxx"
```

## 撤销/还原/放弃本地修改

### 未使用 git add 缓存代码

使用 `git checkout -- 文件路径名`放弃某个文件修改

使用 `git checkout .` 放弃所有文件修改

### 已经使用 git add 缓存代码，未使用git commit

使用 `git reset HEAD 文件名` 放弃某个文件修改


使用 `git reset HEAD` 放弃所有文件修改

### 已经使用 git commit 提交了代码

使用 `git reset --hard HEAD^` 来回退到上一次commit的状态

可以使用 `git reset --hard commitid` 回退到任意版本，使用 `git log` 命令查看git提交历史和`commitid`

## 修改提交历史中的author信息1

#### 当次提交
当次的提交显示指定提交者信息：

```bash
git commit -m "Initial commit" --author="mn <mn@furzoom.com>"
```

#### 修改上次提交
修改已经提交的commit的信息：

```shell
git commit --amend --author="mn <mn@furzoom.com>"
```

#### 修改历史提交
如果是上几次的提交呢？可以利用rebase来实现，如：
```shell
git rebase -i orgin/master
```

在列表中将开头的pick修改为edit，然后重复执行以下命令直到完成：

```shell
git commit --amend --author="mn <mn@furzoom.com>"
git rebase --continue
```

#### 修改所有的提交
与上面的不同在于，不能再使用特定的commit id，使用
```shell
git rebase -i --root
```

## 修改提交历史中的author信息2

```shell
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

### checkout merge reset ...

```shell
git checkout origin/main
# create a new branch
git checkout -b feature/new-branch
# switch the feature/other-branch
git checkout feature/other-branch
# merge origin/main into the current branch
git merge origin/main
# git merge main
# add all files that modified
git add .
# or add some-file and some-dir
git add src/some-file.ts src/some-dir
# status
git status
# reset
git reset HEAD src/some-file.ts
# git reset --soft HEAD^
# commit
git commit -m "some message"
# push
git push
```

### Personal access tokens (classic)

```bash
git remote set-url origin https://capricorncd:{ghp_token}@github.com/capricorncd/repository-name.git
```

### branch

```bash
# show branch list
git branch

# delete branch
git branch -D branch-name
```
