import { BrowserWindow, shell } from 'electron';
import { is } from '@electron-toolkit/utils'
import path from 'node:path';
import icon from '../../resources/icon.png?asset'

function relPath(p: string): string {
  return path.join(__dirname, p)
}

export function createMainWindow(): BrowserWindow {

  const win = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: relPath('../preload/index.js'),
        sandbox: false
      }
    })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(relPath('../renderer/index.html'))
  }

  win.on('close', (e: Electron.Event) => {
    e.preventDefault();
    win?.hide();
    // appManager.deleteWindow("MainWindow")
  });
  
  return win;
}
