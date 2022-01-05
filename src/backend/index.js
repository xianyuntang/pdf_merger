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
            let command = `${path.join(process.cwd(), 'extraFiles', 'pdftk.exe')}`
            args.forEach(item => {
                command += ` "${item}"`
            })
            command += ' cat'
            command += ` output "${result.filePath}"`

            console.log(command)
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