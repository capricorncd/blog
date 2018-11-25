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
