import {
  app,
  Menu,
  BrowserWindow,
  webContents,
} from "electron";
import FileManager from "./FileManager";
import MarkDeckDialog from "./MarkDeckDialog";
import MainWindow from "./MainWindow";

class MarkDeckMenu {

  static createMenu(mainWindow: MainWindow): any[] {

    const saveAsNewFile = () => {
      console.log("saveAsNewFile");
    }

    const template = [{
      label: "File",
      submenu: [{
        label: "Open",
        accelerator: "CmdOrCtrl+O",
        click: () => {
          MarkDeckDialog.showOpenDialog()
            .then((filePath) => FileManager.getInstance().readFile(filePath))
            .then((text) => mainWindow.sendText(text))
            .catch((error) => {
              console.log(error);
            });
        }
      },
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click: () => {
          if (!FileManager.getInstance().getCurrentFilePath()) {
            saveAsNewFile();
            return;
          }

          mainWindow.requestText()
            .then((text) => FileManager.getInstance().overwriteFile(text))
            .catch((error) => {
              console.log(error);
            })
        }
      },
      {
        label: "Save As...",
        click: () => saveAsNewFile()
      },
      {
        label: "Export PDF",
        click: () => console.log("Export PDF")
      },
      ]
    },
    {
      label: "Edit",
      submenu: [{
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        role: "copy"
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        role: "paste"
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+x",
        role: "cut"
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        role: "selectall"
      },
      ]
    },
    {
      label: "View",
      submenu: [{
        label: "Toggle DevTools",
        accelerator: "Alt+Command+I",
        click: () => webContents.getFocusedWebContents().toggleDevTools()
      },
      {
        label: "Show Command Palette",
        accelerator: "Ctrl+P",
        click: () => console.log("call")
      }
      ]
    }
    ];

    if (process.platform === "darwin") {
      template.unshift({
        label: "MarkdownDeck",
        submenu: [{
          label: "quit",
          accelerator: "CmdOrCtrl+q",
          click: () => app.quit()
        }]
      })
    }

    return template;
  }
}

export default MarkDeckMenu
