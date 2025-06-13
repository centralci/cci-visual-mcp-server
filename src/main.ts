import { app, BrowserWindow } from 'electron';
import { appManager } from '@/electron/AppManager';
import { TrayMenu } from '@/electron/TrayMenu';
import { MainWindow } from '@/electron/MainWindow';
import { ipcMain } from 'electron';


app.on('ready', () => {
  appManager.setTray(new TrayMenu());
  appManager.setWindow('MainWindow', new MainWindow());

  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow()
  //   }
  // })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('setTitle', (event, title) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title);
});

ipcMain.handle('ping', (event, value) => {
  return `${value} pong`;
});