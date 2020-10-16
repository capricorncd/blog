$(function () {
  $('.del').click(function (e) {
    var id = $(this).data('id')
    var tr = $(this).closest('tr')

    var conf = confirm('你确定要删除“'+ $(this).data('title') +'”吗？')
    if (!conf) {
      return
    }

    $.ajax({
      type: 'DELETE',
      url: '/admin/list?id=' + id
    })
      .done(function (res) {
        if (res.code === 0) {
          if (tr.length > 0) {
            tr.remove()
          }
          alert('删除成功！')
        }
        console.log(res)
      })
  })
})
