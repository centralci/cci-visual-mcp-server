import { TrayMenu } from "./TrayMenu";
import { createMainWindow } from "./MainWindow";
import { BrowserWindow } from "electron";


export type WindowName = "MainWindow"

class AppManager {
  private trayMenu!: TrayMenu;
  private windowMap: Map<string, BrowserWindow> = new Map();

  setTray(tray: TrayMenu): void {
    this.trayMenu = tray;
  }

  getTray(): TrayMenu {
    return this.trayMenu;
  }

  setWindow(name: WindowName, window: BrowserWindow): void {
    this.windowMap.set(name, window);
  }

  getWindow(name: WindowName): BrowserWindow {
    const element = this.windowMap.get(name);
    if (element) {
      return element;
    } else if (name === "MainWindow") {
      const win = createMainWindow()
      this.setWindow("MainWindow", win)
      return win
    } else {
      throw new Error(`[AppManager] - Element with name ${name} doesn't exist!`)
    }
  }

  destroyWindow(name: WindowName): void {
    const win = this.windowMap.get(name)
    if (win) {
      win.destroy();
    }
    this.windowMap.delete(name)
  }

  destroyAllWindows(): void {
    for (const win of this.windowMap.values()) {
      win.destroy()
    }
    this.windowMap.clear()
  }
}

export const appManager = new AppManager();