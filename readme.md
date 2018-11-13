# get-architecture

A tiny Node utility to detect whether .exe and .dll files are 32 or 64-bit.

## Installation

```bash
$ npm install get-architecture
```

## Usage

`get-architecture` exposes a function; simply pass this function the path of a .exe or .dll to test and it will return a promise resolving to `x86`, `x64`, or rejecting with `Unknown`.

```js
const getArchitecture = require('get-architecture');

(async () => {
  const arch = await getArchitecture('myFile.exe');
  console.log(arch); // 'x64'
})();
```
