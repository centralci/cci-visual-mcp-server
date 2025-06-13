import { app, Tray, Menu, nativeImage } from 'electron';
import { appManager } from './AppManager';
import trayIcon from '../../resources/AppTrayTemplate.png?asset'

export class TrayMenu {
  // Create a variable to store our tray
  // Public: Make it accessible outside of the class;
  // Readonly: Value can't be changed
  public readonly tray: Tray;

  constructor() {
    this.tray = new Tray(this.createNativeImage())
    this.tray.setContextMenu(this.createMenu())
    this.tray.setToolTip('Concourse MCP Proxy')
  }

  createNativeImage() {
    // Since we never know where the app is installed,
    // we need to add the app base path to it.

    const image = nativeImage.createFromPath(trayIcon)
    // Marks the image as a template image.
    image.setTemplateImage(true);
    return image;
  }

  createMenu(): Menu {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open Dashboard',
        type: 'normal',
        click: () => { 
          appManager.getWindow('MainWindow').show();
        }
      },
      {
        label: 'Quit',
        type: 'normal',
        click: () => {
          appManager.destroyAllWindows()
          app.quit()
        }
      }
    ]);
    return contextMenu;
  }
}