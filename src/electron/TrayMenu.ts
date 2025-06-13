import { app, Tray, Menu, nativeImage } from 'electron';
import { appManager } from './AppManager';
import path from "node:path"

export class TrayMenu {
  // Create a variable to store our tray
  // Public: Make it accessible outside of the class;
  // Readonly: Value can't be changed
  public readonly tray: Tray;

  // Path where should we fetch our icon;
  private iconPath: string = '/images/AppTrayTemplate.png';


  constructor() {
    this.tray = new Tray(this.createNativeImage())
    this.tray.setContextMenu(this.createMenu())
    this.tray.setToolTip('Concourse MCP Proxy')
  }

  createNativeImage() {
    // Since we never know where the app is installed,
    // we need to add the app base path to it.

    const trayIconPath = path.join(app.getAppPath(), this.iconPath)
    const image = nativeImage.createFromPath(trayIconPath)
    // Marks the image as a template image.
    image.setTemplateImage(true);
    return image;
  }

  createMenu(): Menu {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        type: 'normal',
        click: () => { 
          appManager.getWindow('MainWindow').window.show();
        }
      },
      {
        label: 'Quit',
        type: 'normal',
        click: () => app.quit()
      }
    ]);
    return contextMenu;
  }
}