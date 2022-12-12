// const fs = require('fs')
// console.log(fs)

// fs.writeFile('C:/Users/Administrator/Desktop/example.txt', 'abc', () => {
//     console.log('done')
// })
const {contextBridge, ipcRenderer} = require('electron')
// console.log(contextBridge)
const handleSend = async (arg) => {
    let callback = await ipcRenderer.invoke('send-event', arg)
    console.log(callback)
}
contextBridge.exposeInMainWorld('myApi', {
        platform: process.platform,
        handleSend
})

