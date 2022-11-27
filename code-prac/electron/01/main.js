const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false
            preload: path.resolve(__dirname, './preload.js')
        },
    })
    // win.loadURL('https://www.mindcons.cn')
    win.loadFile('index.html')

    // 允许打开调试
    win.webContents.openDevTools()

    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
}

// 主进程中注册好事件
ipcMain.handle('send-event', (event, msg) => {
    console.log(msg)
    return msg
})

app.on('before-quit', () => {
    console.log('App is quiting')
})

app.on('browser-window-blur', (e) => {
    console.log('App unfocused')
})

app.on('browser-window-focus', (e) => {
    console.log('App focused')
})












app.on('window-all-closed', () => {
    console.log('close')
    // 对于mac系统，关闭窗口时，不能直接退出应用
    if(process.platform !== 'darwin') { // mac系统的名字
        app.quit()
    }
})
app.whenReady().then(() => {
    createWindow()

    // 在Mac系统下，当全部窗口关闭，点击dock图标，窗口再次打开（针对mac下关闭窗口后不能重新打开的问题）
    app.on('active',() => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})