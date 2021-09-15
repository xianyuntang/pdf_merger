import {ipcMain, dialog} from 'electron'

const {exec} = require('child_process');
import path from "path";

export function registerListener() {
    ipcMain.on('start-merge', (event, args) => {
        console.log(args)
        dialog.showSaveDialog({
            filters: [
                {name: 'PDF', extensions: ['pdf']},

            ]
        }).then(async (result) => {

            const params = [`${path.join(process.cwd(), 'extraFiles', 'pdf_merger.exe')}`]
            args.forEach(item => {
                params.push('-i')
                params.push(item)
            })
            params.push('-o')
            params.push(result.filePath)
            const command = params.join(' ')
            exec(command, function (err, stdout, stderr) {
                if (err === null) {
                    event.reply('stop-merge', {'message': '成功'})
                } else {
                    event.reply('stop-merge', {'message': stderr})
                }
            });

        }).catch(err => {
            console.log(err)
        })
    })
}