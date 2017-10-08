import { dialog } from "electron";

class MarkDeckDialog {

  static showOpenDialog(): Promise<string> {
    return new Promise((resolve, reject) => {
      const files = dialog.showOpenDialog(
        {
          title: "open",
          properties: ["openFile"],
          filters: [
            { name: "markdown file", extensions: ["md"] }
          ]
        }
      );

      if (files && files.length > 0) {
        resolve(files[0]);
      } else {
        reject();
      }
    });
  }

  static showSaveAsNewFileDialog(): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = dialog.showSaveDialog(
        {
          title: "save",
          filters: [{ name: "markdown file", extensions: ["md"] }]
        }
      );
      if (file) {
        resolve(file);
      } else {
        reject();
      }
    });
  }

}

export default MarkDeckDialog
