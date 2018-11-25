## global

CommonJS

Buffer、process、console

timer

### # global

```
const a = 1000

global.b = 2000

module.exports.a = a
```

### # process

```
/*
  argv // node ./04_process.js a=1 b=2 c=3 ...
  argv0 // argv0: a=1
  execArgv // node --inspect 04_process.js, execArgv: ['--inspect']
  execPath //
*/

/**
 * process
 */
const { argv, argv0, execArgv, execPath } = process

argv.forEach(item => {
  console.log(item)
})

console.log(argv0)
console.log(execArgv)
console.log(execPath)

/**
 * env 环境
 */
const { env } = process

console.log(env)
```

cwd()

```
process.cwd()
```

setImmediate() // last run

```
process.nextTick(_ => {
  console.log('nextTick')
})

setTimeout(_ => {
  console.log('setTimeout')
})

setImmediate(_ => {
  console.log('setImmediate')
})
```
