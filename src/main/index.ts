import {
  app,
  Menu
} from "electron";
import MarkDeckDialog from "./MarkDeckDialog";
import FileManager from "./FileManager";
import MarkDeckMainWindow from "./MarkDeckMainWindow";
import MarkDeckMenu from "./MarkDeckMenu";

let mainWindow: MarkDeckMainWindow;
let fileManager: FileManager;

function openFile() {
  MarkDeckDialog.showOpenDialog()
    .then((filePath: string) => FileManager.getInstance().readFile(filePath))
    .then((text) => mainWindow.sendText(text))
    .catch((error) => {
      console.log(error);
    });
}

function saveFile() {
  if (!fileManager.getCurrentFilePath()) {
    saveAsNewFile();
    return;
  }

  mainWindow.requestText()
    .then((text) => fileManager.overwriteFile(text))
    .catch((error) => {
      console.log(error);
    })
}

function saveAsNewFile() {
  console.log("saveAsNewFile");
}

function exportPDF() {

  Promise.all([
    MarkDeckDialog.showSaveAsNewFileDialog(),
    mainWindow.requestText()
  ]).then(([filePath, text]) => fileManager.saveFile(filePath, text))
    .catch((error) => {
      console.log(error);
    });

  console.log("exportPDF");
}

app.on("ready", () => {
  mainWindow = new MarkDeckMainWindow();
  fileManager = FileManager.getInstance();
  Menu.setApplicationMenu(Menu.buildFromTemplate(MarkDeckMenu.createMenu(mainWindow)));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = new MarkDeckMainWindow();
  }
});