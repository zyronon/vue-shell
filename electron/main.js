// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')	//引入Node fs库

// 在主进程中

let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 700,
        // frame: false,//啥都没有了
        // titleBarStyle: 'hiddenInset',//有红绿灯，注：win上无效，mac没验证
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    win.webContents.openDevTools({mode: 'bottom'})

    // and load the index.html of the app.
    // win.loadFile('./dist/index.html')
    win.loadFile('index.html')
    // win.loadFile('http://localhost:8863/')
    // win.loadURL(`file://${__dirname}/index.html`)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const openFile = (file) => {
    const content = fs.readFileSync(file).toString()
    win.webContents.send('file-opened', file, content) // 我们将通过"file-opened"通道将文件的名称及其内容发送到渲染器进程
}

function closeWindow() {
    win.close()
    // app.quit()
}

function hideWindow() {
    win.minimize()
}
function maximizeWindow() {
    if (win.isMaximized()){
        win.unmaximize()
    }else {
        win.maximize()
    }
}


exports.createWindow = createWindow
exports.openFile = openFile
exports.closeWindow = closeWindow
exports.hideWindow = hideWindow
exports.maximizeWindow = maximizeWindow
