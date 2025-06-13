import { contextBridge, ipcRenderer } from "electron";

declare global {
  interface Window {
    electronAPI: any;
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  modifyTitle: (newTitle: string) => {
    ipcRenderer.send('setTitle', newTitle) 
  },
  ping: async (data: string) => {
    console.log(`[*] renderer -> preload, preload receive data from renderer: ${data}`);
    const result = await ipcRenderer.invoke('ping', data);
    return result;
  }
});