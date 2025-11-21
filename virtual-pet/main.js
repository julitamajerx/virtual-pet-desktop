const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const psList = require('ps-list').default;
const Store = require('electron-store').default;

let window;
const store = new Store();

function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 400,
    useContentSize: true,
    resizable: false,
    maximizable: false,
    minimizable: true,
    transparent: true,
    frame: false,
    fullscreenable: false,
    icon: path.join(__dirname, 'assets/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

const indexPath = path.join(__dirname, 'app-build', 'browser', 'index.html');  window.loadFile(indexPath);
  window.webContents.openDevTools();
  window.setMenu(null);

  window.on('closed', () => {
    window = null;
  });
}

ipcMain.on('app:close', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

ipcMain.on('save-log', (event, logText) => {
  const logPath = path.join(app.getPath('documents'), 'game.log');
  fs.appendFileSync(logPath, logText + '\n', 'utf8');
});

ipcMain.handle('get-process-list', async () => await psList());
ipcMain.handle('getPetName', () => store.get('petName', ''));
ipcMain.handle('setPetName', (event, name) => store.set('petName', name));

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
