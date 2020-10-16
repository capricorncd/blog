console.log('event')

const btn1 = document.getElementById('btn1')

const body = document.querySelector('body')

btn1.addEventListener('click', e => {
  console.log(e.target.innerText)
})


body.addEventListener('click', e => {
  const currentTarget = e.currentTarget
  console.log('currentTarget: ', currentTarget)
  const target = e.target
  console.log('target: ', target)
})

