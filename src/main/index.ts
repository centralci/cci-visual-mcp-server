import { app, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { appManager } from './AppManager'
import { TrayMenu } from './TrayMenu'
import { startMain } from './mainEffect'

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  appManager.setTray(new TrayMenu())
  appManager.getWindow('MainWindow') //pre-initialise
})

app.on('window-all-closed', () => {
  //don't app.quit(), we stick around as a tray
})


// app.on("will-quit", () => {
//   console.log("will-quit");
// });

app.on("before-quit", () => {
  console.log("before-quit");
  appManager.destroyAllWindows()
});

// app.on("quit", () => {
//   console.log("quit");
// });

// process.on("SIGINT SIGTERM", () => {
//   console.log("Detected SIGINT/SIGTERM");
// });

// process.on("SIGTERM", () => {
//   console.log("Detected SIGTERM");
// });

startMain()