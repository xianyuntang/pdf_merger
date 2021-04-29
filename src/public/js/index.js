// EVENT
$(document).ready(function () {
    $("#btn-open").on('click', function () {
        ipc.send('open-dialog')
    })
    $("#btn-merge").on('click', function () {
        let serialized = sortable('#selected-file-list', 'serialize')
        let fileList = []
        serialized[0].items.forEach((item) =>{
            fileList.push(item.node.innerText)
        })
        ipc.send('start-merge', fileList)

    })

})
// IPC
$(document).ready(() => {
    ipc.on('open-dialog-reply', (args) => {
        $("#selected-file-list").html('')
        args.filePaths.forEach(item => {
            let li = document.createElement('li')
            li.innerText = item

            $("#selected-file-list").append(li)

        })
        sortable('#selected-file-list');
    })

    ipc.on('start-merge-reply', () => {
        alert('成功')
    })
})