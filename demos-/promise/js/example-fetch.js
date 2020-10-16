fetch('some.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    // do something with this josn
    console.log(json)
  })
  .catch(err => {
    console.log(err)
  })
