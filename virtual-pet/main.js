const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 400,
    useContentSize: true,
    resizable: false,
    maximizable: false,
    minimizable: true,
    frame: false,
    fullscreenable: false,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, 'dist/virtual-pet/browser/assets/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadFile(path.join(__dirname, 'dist/virtual-pet/browser/index.html'));

  window.webContents.openDevTools();

  window.setMenu(null);

  window.on('closed', function () {
    window = null;
  });

  window.once('ready-to-show', () => {
    window.setContentSize(400, 400);
  });
}

ipcMain.on('app:close', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.close();
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
