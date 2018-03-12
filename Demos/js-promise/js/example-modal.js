// 弹出模态框
let confirm = popupManager.confirm('你确定么？')
confirm.promise
  .then(() => {
    // do confirm staff
  })
  .catch(() => {
    // do cancel staff
  })

// 窗体的构造函数
class Confirm {
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.confirmButton.onClick = resolve
      this.cancelButton.onClick = reject
    })
  }
}
