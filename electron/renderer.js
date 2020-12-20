// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// Modules to control application life and create native browser window
const {remote, ipcRenderer} = require('electron')
const mainProcess = remote.require('./main.js')

function createWindow() {
    mainProcess.createWindow()
}

function openFileDialog() {
    mainProcess.openFile()
}

function closeWindow() {
    mainProcess.closeWindow()
}

function hideWindow() {
    mainProcess.hideWindow()
}

function maximizeWindow() {
    mainProcess.maximizeWindow()
}


ipcRenderer.on('file-opened', (event, file, content) => {
    console.log(content)
})
