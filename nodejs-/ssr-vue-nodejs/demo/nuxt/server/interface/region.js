/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/12/09 17:25
 */
import Router from 'koa-router'

const router = new Router({
  prefix: '/region'
})

router.get('/list', async ctx => {
  ctx.body = {
    code: 0,
    list: [
      {
        name: '北京',
        parent_id: 0,
        id: 1,
        child: [
          {
            name: '朝阳区',
            parent_id: 1,
            id: 101
          },
          {
            name: '海淀区',
            parent_id: 1,
            id: 102
          },
          {
            name: '东城区',
            parent_id: 1,
            id: 103
          }
        ]
      },
      {
        name: '上海',
        parent_id: 0,
        id: 2,
        child: [
          {
            name: '浦东新区',
            parent_id: 2,
            id: 201
          },
          {
            name: '黄浦区',
            parent_id: 2,
            id: 202
          },
          {
            name: '普陀区',
            parent_id: 2,
            id: 203
          }
        ]
      }
    ]
  }
})

export default router
