const path = require('path');
const builder = require('electron-builder');

builder.build({

    projectDir: path.resolve(__dirname),  // 專案路徑

    win: ['nsis', 'portable'],  // nsis . portable
    config: {
        "appId": "com.pdf-merger.electron.cat",
        "productName": "PDF合成器", // 應用程式名稱 ( 顯示在應用程式與功能 )
        "directories": {
            "output": "build/win"
        },
    },
})
    .then(
        data => console.log(data),
        err => console.error(err)
    );