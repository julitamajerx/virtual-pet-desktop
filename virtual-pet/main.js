const { app, BrowserWindow } = require('electron');
const path = require('path');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 440,
    height: 480,
    resizable: false,
    maximizable: false,
    minimizable: true,
    fullscreenable: false,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, 'dist/virtual-pet/browser/assets/logo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.loadFile(path.join(__dirname, 'dist/virtual-pet/browser/index.html'));

  window.webContents.openDevTools();

  window.setMenu(null);

  window.on('closed', function () {
    window = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
