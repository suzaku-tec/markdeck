import * as fs from "fs";

class FileManager {

  private static instance: FileManager;

  private filePath: string;

  private constructor() {
    this.filePath = "";
  }

  static getInstance(): FileManager {
    console.log("[FileManager$getInstance] instance", this.instance);
    this.instance = this.instance || new FileManager();
    return this.instance;
  }

  saveFile(filePath: string, text: string) {
    return new Promise((resolve) => {
      fs.writeFileSync(filePath, text);
      this.filePath = filePath;
      resolve();
    });
  }

  readFile(filePath: string): Promise<string> {
    return new Promise((resolve) => {
      const text = fs.readFileSync(filePath, "utf8");
      this.filePath = filePath;
      console.log("[FileManager$readFile]filePath", filePath);
      resolve(text);
    });
  }

  overwriteFile(text: string) {
    return new Promise((resolve) => {
      this.saveFile(this.filePath, text).then(resolve);
    });
  }

  writePdf(filePath: string, pdf: any) {
    return new Promise((resolve) => {
      fs.writeFileSync(filePath, pdf);
      resolve();
    });
  }

  getCurrentFilePath(): string {
    return this.filePath;
  }
}

export default FileManager
