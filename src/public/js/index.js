$(document).ready(function () {
    $("#btn-open").on('click', function () {
        ipc.send('open-dialog')
    })
    $("#btn-merge").on('click', function () {
        ipc.send('start-merge', $("#selected-file").val())

    })

    ipc.on('open-dialog-reply', (args) => {
        $("#selected-file-list").html('')
        let selected_file_list = []
        args.filePaths.forEach(item => {
            let li = document.createElement('li')
            li.innerText = item
            selected_file_list.push(item)

            $("#selected-file-list").append(li)
        })
        $("#selected-file").val(selected_file_list)
    })

    ipc.on('start-merge-reply',()=>{
        alert('成功')
    })
})

