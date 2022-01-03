import {ipcMain, dialog} from 'electron'

const {exec} = require('child_process');
import path from "path";

const PDFMerger = require('pdf-merger-js');

export function registerListener() {
    ipcMain.on('start-merge', (event, args) => {
        console.log(args)
        dialog.showSaveDialog({
            filters: [
                {name: 'PDF', extensions: ['pdf']},

            ]
        }).then(async (result) => {
            await merge(result.filePath, args).then(() => {
                event.reply('stop-merge', {'message': '成功'})
            })


        }).catch(err => {
            console.log(err)
        })
    })
}

async function merge(filePath, fileList) {
    let merger = new PDFMerger();

    await (async () => {
        for (let i = 0; i < fileList.length; i++) {
            merger.add(fileList[i])
        }

        await merger.save(filePath)
    })()
}