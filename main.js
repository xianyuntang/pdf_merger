const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const PDFMerger = require('pdf-merger-js');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('src/templates/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('open-dialog', (event, arg) => {
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
    }).then((result) => {

        event.reply('open-dialog-reply', result)
    })
})

ipcMain.on('start-merge', (event, args) => {
    dialog.showSaveDialog({
        filters: [
            {name: 'PDF', extensions: ['pdf']},

        ]
    }).then(async (result) => {
        console.log(result)
        const fileList = args.split(',')

        const merger = new PDFMerger();
        fileList.forEach(item => {
            merger.add(item)

        })
        await merger.save(result.filePath)

        event.reply('start-merge-reply', result)
    })


})