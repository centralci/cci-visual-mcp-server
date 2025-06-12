import { app, BrowserWindow } from 'electron';
import { TrayMenu } from '@/electron/TrayMenu';

import isDev from 'electron-is-dev'

type AppElements = {
  tray?: TrayMenu
  windows: BrowserWindow[]
}
const appElements: AppElements = {
  tray: undefined,
  windows: []
};

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadURL(
    isDev
      ? 'http://localhost:9000'
      : `file://${app.getAppPath()}/index.html`,
  )
}

app.on('ready', () => {
  appElements.tray = new TrayMenu();
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})