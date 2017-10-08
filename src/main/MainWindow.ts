export default interface MainWindow {

  requestText(): Promise<string>;

  sendText(text: string): void;
}
