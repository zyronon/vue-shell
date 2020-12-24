// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// Modules to control application life and create native browser window
const {remote, ipcRenderer} = require('electron')
const {BrowserWindow, dialog, app, net} = remote
const path = require('path')
const fs = require('fs')
const axios = require('axios')

function $console(v) {
    console.log(JSON.stringify(v, null, 4))
}

document.getElementById('uploadFile').addEventListener('click', () => {
    window.nodeFunc.uploadFile()
})

document.getElementById('downloadFile').addEventListener('click', () => {
    window.nodeFunc.downloadFile()
})

document.getElementById('openNewWindow').addEventListener('click', () => {
    window.nodeFunc.openNewWindow()
})

document.getElementById('saveAs').addEventListener('click', () => {
    window.nodeFunc.saveAs()
})

document.getElementById('chooseFile').addEventListener('click', () => {
    window.nodeFunc.chooseFile()
})

document.getElementById('hideWindow').addEventListener('click', () => {
    window.nodeFunc.hideWindow()
})

document.getElementById('maximizeWindow').addEventListener('click', () => {
    window.nodeFunc.maximizeWindow()
})

document.getElementById('closeWindow').addEventListener('click', () => {
    window.nodeFunc.closeWindow()
})

ipcRenderer.on('file-opened', (event, file, content) => {
    console.log(content)
})

window.nodeFunc = {
    chooseFile() {
        return dialog.showOpenDialogSync({
            title: '选择文件',
            defaultPath: app.getPath('downloads'),
            buttonLabel: '确定',
            filters: [],
            properties: ['openFile'],
            message: '文件选择器'
        })
    },
    closeWindow() {
        remote.getCurrentWindow().close()
    },
    hideWindow() {
        remote.getCurrentWindow().minimize()
    },
    maximizeWindow() {
        let win = remote.getCurrentWindow()
        if (win.isMaximized()) {
            win.restore()
        } else {
            win.maximize()
        }
    },
    saveAs() {
        const res = dialog.showOpenDialogSync({
            title: '另存为',
            // 默认打开的路径，比如这里默认打开下载文件夹
            defaultPath: app.getPath('downloads'),
            buttonLabel: '保存',
            // 限制能够选择的文件类型
            filters: [
                // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
                // { name: 'Custom File Type', extensions: ['as'] },
                {name: 'All Files', extensions: ['*']},
            ],
            properties: ['openDirectory'],
            message: 'mac文件选择器title'
        })
        console.log('res', res)
        return res
    },
    openNewWindow() {
        const win = new BrowserWindow({
            width: 800, height: 600, webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                enableRemoteModule: true
            }
        })
        win.loadURL(path.join(__dirname, 'index.html'),)
    },
    downloadFile() {
        let win = remote.getCurrentWindow()
        win.webContents.downloadURL('http://localhost/file.php')
        win.webContents.session.on('will-download', (event, item, webContents) => {
            item.setSavePath('D:\\my\\download\\test.iso')
            console.log(item)

            item.on('updated', (event, state) => {
                if (state === 'interrupted') {
                    console.log('下载已经中断，可以恢复')
                } else if (state === 'progressing') {
                    if (item.isPaused()) {
                        console.log('下载暂停')
                    } else {
                        let a = item.getReceivedBytes() / 1024 / 1024
                        let b = item.getTotalBytes() / 1024 / 1024
                        console.log(`收到数据: ${a.toFixed(2)} / ${b.toFixed(2)}`)
                        const progress = item.getReceivedBytes() / item.getTotalBytes()
                        console.log('下载进度' + (progress * 100).toFixed(0) + '%')
                    }
                }
            })
            item.once('done', (event, state) => {
                if (state === 'completed') {
                    console.log('下载完成')
                } else {
                    console.log(`下载失败: ${state}`)
                }
            })
        })
    },
    uploadFile() {
        let path = this.chooseFile()
        path = path[0]
        if (path) {
            let extension = path.split('\\')
            extension = extension[extension.length - 1]
            let file = new File([fs.readFileSync(path)], extension)
            const fd = new FormData()
            fd.append('file', file)

            let url = 'http://localhost/file.php'

            axios.post(url, fd, {
                onUploadProgress: (progressEvent) => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    console.log('上传:' + complete)
                },
                // onDownloadProgress
            }).then(res => {
                if (res.status === 200 && res.data === '') {
                    console.log('上传完成')
                }
            })
        }
    }
}
