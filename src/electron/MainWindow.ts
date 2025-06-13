import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import isDev from 'electron-is-dev';

function relPath(p: string): string {
  return path.join(__dirname, p)
}

export class MainWindow {
  public readonly window: BrowserWindow;

  constructor() {
    this.window = this.createWindow();
  }

  createWindow(): BrowserWindow {
    const win = new BrowserWindow({
      width: 300,
      height: 600,
      show: false, // This will the window hidden in launch time.
      webPreferences: {
        nodeIntegration: true,
        preload: relPath("preload.js"),
      }
    })

    if(isDev) {
      win.loadFile(relPath("index.html"))
    } else {
      win.loadURL("http://localhost:9000")
    }
    return win;
  }
}