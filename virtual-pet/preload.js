const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('app:close'),
});

contextBridge.exposeInMainWorld('logger', {
  save: (text) => ipcRenderer.send('save-log', text)
});
