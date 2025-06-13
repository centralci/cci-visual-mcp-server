import { TrayMenu } from "./TrayMenu";
import { MainWindow } from "./MainWindow";

export type ManagerTypes = MainWindow;

class AppManager {
  private trayMenu!: TrayMenu;
  private windowMap: Map<string, ManagerTypes> = new Map();

  setTray(tray: TrayMenu): void {
    this.trayMenu = tray;
  }

  getTray(): TrayMenu {
    return this.trayMenu;
  }

  setWindow(name: string, element: ManagerTypes): void {
    this.windowMap.set(name, element);
  }

  getWindow(name: string): ManagerTypes {
    const element = this.windowMap.get(name);
    if (element) {
      return element;
    } else if (name === "MainWindow") {
      const win = new MainWindow()
      this.setWindow("MainWindow", win)
      return win
    } else {
      throw new Error(`[AppManager] - Element with name ${name} doesn't exist!`)
    }
  }

  deleteWindow(name: string): void {
    this.windowMap.delete(name)
  }
}

export const appManager = new AppManager();