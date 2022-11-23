// const fs = require('fs')
// console.log(fs)

// fs.writeFile('C:/Users/Administrator/Desktop/example.txt', 'abc', () => {
//     console.log('done')
// })
const {contextBridge} = require('electron')
console.log(contextBridge)
// contextBridge.exposeInMainWorld('my-api')