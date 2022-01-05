

module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            builderOptions: {
                appId: "com.pdf.merger.electron.node",
                asar: false,
                productName: "PDF合成",
                win: {
                },
                extraFiles:[
                    "extraFiles/pdftk.exe"
                ]

            }
        }
    }
}