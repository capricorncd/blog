# npm

## 发布前缀为@xxx的包

1.登录[npm](https://www.npmjs.com/)

2.进入package管理页面[Packages](https://www.npmjs.com/settings/capricorncd/packages)，添加组织`Organizations`

3.添加组织: 输入组织名称`test-org`，Unlimited public packages `Free`，点击`Create`创建按钮

~~4.创建Package:~~
  - ~~点击左边栏创建好的组织名称`test-org`，再点击右边的`Add Package`，进入Teams页面~~
  - ~~点击`developers`栏的`Packages`按钮，进入`Add Packages to developers`页面，添加比如`@test-org/xxxx`的package~~

4.从本地发布`@test-org/xxxx`的package

```bash
# 登录（弹出浏览器窗口，在浏览器中认证）
npm login
# 查看登录用户
npm whoami
# 第一次发布
npm publish --access public
# 之后发布版本
npm publish
```

至此回到npm的管理页面，在组织`test-org`中可以看到刚发布的`@test-org/xxxx`包
