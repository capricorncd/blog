https://nodejs.org/dist/latest-v11.x/docs/api/

## path

https://nodejs.org/dist/latest-v11.x/docs/api/path.html

```
console.log(__dirname);
console.log(process.cwd());
console.log(path.resolve('./'));
```

* `__dirname`, `__filename` 总是返回文件的绝对路径

* `process.cwd()` 总是返回执行node命令所在的目录

## Buffer

https://nodejs.org/dist/latest-v11.x/docs/api/buffer.html

* Buffer 用于处理二进制数据流

* 实例类似整数的数组，大小固定

* C++ 代码在V8堆外分配物理内存

```
// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);

// Creates a Buffer of length 10, filled with 0x1.
const buf2 = Buffer.alloc(10, 1);

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using either fill() or write().
const buf3 = Buffer.allocUnsafe(10);

// Creates a Buffer containing [0x1, 0x2, 0x3].
const buf4 = Buffer.from([1, 2, 3]);

// Creates a Buffer containing UTF-8 bytes [0x74, 0xc3, 0xa9, 0x73, 0x74].
const buf5 = Buffer.from('tést');

// Creates a Buffer containing Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf6 = Buffer.from('tést', 'latin1');
```

* Buffer.byteLength

* Buffer.isBuffer()

* Buffer.concat()

### # 实例常用方法

```
const buf = Buffer.from('This is a test!')
```

* buf.length

* buf.toString()

* buf.fill()

* buf.equals()

* buf.indexOf()

* buf.copy()

```
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')

const buf = Buffer.from('中文字符串！')

for (let i = 0; i < buf.length; i++) {
  const b = Buffer.allocUnsafe(5)
  buf.copy(b, 0, i)
  console.log(b.toString())
}

// use decoder，能打印处完整的中文字
for (let i = 0; i < buf.length; i++) {
  const b = Buffer.allocUnsafe(5)
  buf.copy(b, 0, i)
  console.log(decoder.write(b))
}
```

## Event

https://nodejs.org/dist/latest-v11.x/docs/api/events.html

```
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

```
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
// Prints: whoops! there was an error
```

## fs / file system

https://nodejs.org/dist/latest-v11.x/docs/api/fs.html

```
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

createWriteStream()

```
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt')

const timer = setInterval(() => {
  const num = parseInt(Math.random() * 10)
  if (num < 7) {
    ws.write(num + '')
  } else {
    clearInterval(timer)
    ws.end()
  }
}, 200)

ws.on('finish', () => {
  console.log('finish!')
})
```

promisify

```
const fs = require('fs')
const promisify = require('util').promisify

const read = promisify(fs.readFile)

read('./test.txt').then(data => {
  console.log(data.toString())
}).catch(err => {
  console.log(err)
})

async function testFn () {
  try {
    const data = await read('./test.txt')
    console.log(data.toString())
  } catch (err) {
    console.log(err)
  }
}

testFn()
```
