const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("ipc", {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),

    on: (key, handler) => ipcRenderer.on(key, (event, ...args) => handler(...args))
});