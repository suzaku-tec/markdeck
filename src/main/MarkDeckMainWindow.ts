import {
  BrowserWindow,
  ipcMain
} from "electron";
import MainWindow from "./MainWindow";

class MarkDeckMainWindow implements MainWindow {

  private window: any;

  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600
    });

    this.window.loadURL(`file://${__dirname}/../../index.html`);
    this.window.on("closed", () => {
      this.window = null;
    });
  }

  /**
   * rendererプロセスにテキストを送信する
   * 
   * @returns {Promise<string>} 
   * @memberof MainWindow
   */
  requestText(): Promise<string> {
    return new Promise((resolve) => {
      this.window.webContents.send("REQUEST_TEXT");
      ipcMain.once("REPLY_TEXT", (e: any, text: string) => resolve(text));
    })
  }

  sendText(text: string): void {
    this.window.webContents.send("SEND_TEXT", text);
  }
}

export default MarkDeckMainWindow;
