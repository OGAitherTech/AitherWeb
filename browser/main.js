const { app, BrowserWindow, session } = require('electron');
const path = require('path');

const HOME = 'https://ogatiertech.github.io/AitherWeb/';
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Aither Browser',
    backgroundColor: '#080a0f',
    webPreferences: {
      contextIsolation: true,
      sandbox: true
    }
  });
  win.loadFile(path.join(__dirname, 'chrome.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    win.webContents.send('open-url', url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(true));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
