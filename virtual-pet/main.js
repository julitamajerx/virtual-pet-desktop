const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store').default;
const url = require('url');
const childProcess = require('child_process');
const util = require('util');
const execFile = util.promisify(childProcess.execFile);

let mainWindow;
const store = new Store();

function createWindow() {
    mainWindow = new BrowserWindow({
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

    const indexPath = path.join(app.getAppPath(), 'app-build', 'browser', 'index.html');

    mainWindow.loadURL(url.format({
        pathname: indexPath,
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null;
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

ipcMain.handle('get-process-list', async () => {
    try {
        const { stdout } = await execFile('tasklist.exe', ['/fo', 'csv', '/nh']);

        const processes = stdout.trim().split('\r\n').map(line => {
            const parts = line.replace(/"/g, '').split(',');
            return {
                name: parts[0] ? parts[0].trim() : '',
                pid: parts[1] ? parseInt(parts[1].trim()) : 0,
                memory: parts[4] ? parts[4].trim().replace(/\sK/g, '') : '0'
            };
        });

        return processes.filter(p => p.pid > 0);

    } catch (error) {
        console.error("Błąd podczas listowania procesów (tasklist):", error);
        return [];
    }
});

ipcMain.handle('getPetName', () => store.get('petName', ''));
ipcMain.handle('setPetName', (event, name) => store.set('petName', name));

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});