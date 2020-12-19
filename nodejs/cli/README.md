# devcli

```shell script
mkdir devcli
cd devcli
npm init -y
npm i commander shelljs
```

touch index.js

```javascript
#!/usr/bin/dev node
console.log('hello devcli')
```

package.json

```json
{
  "**": "...",
  "bin": {
    "devcli": "./index.js"
  }
}
```

```shell script
npm link
```

Error:

```shell script
npm ERR! code EACCES
npm ERR! syscall symlink
npm ERR! path /Users/**/devcli
npm ERR! dest /usr/local/lib/node_modules/devcli
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, symlink '/Users/**/devcli' -> '/usr/local/lib/node_modules/devcli'
npm ERR!  [Error: EACCES: permission denied, symlink '/Users/**/devcli' -> '/usr/local/lib/node_modules/devcli'] {
npm ERR!   stack: "Error: EACCES: permission denied, symlink '/Users/**/devcli' -> '/usr/local/lib/node_modules/devcli'",
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'symlink',
npm ERR!   path: '/Users/**/devcli',
npm ERR!   dest: '/usr/local/lib/node_modules/devcli'
npm ERR! }
npm ERR! 
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR! 
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/zhongxing/.npm/_logs/2020-12-11T12_44_30_932Z-debug.log
```

try running the command again as root/Administrator.

```shell script
sudo npm link
```

test

```shell script
devcli
# echo:
# hello devcli
```



