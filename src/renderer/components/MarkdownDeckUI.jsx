import { ipcRenderer } from "electron"
import style from "./MarkdownDeckUI.css"
import React from "react";
import Editor from "./Editor"
import Previewer from "./Previewer"

export default class MarkdownDeckUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e) {
    this.setState({ text: e })
  }

  render() {
    return (
      <div className={style.markdownDeck}>
        <Editor
          className={style.editorArea}
          value={this.state.text}
          edit={this.onChangeText}
        />
        <Previewer
          className={style.previewArea}
          value={this.state.text}
        />
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.on("REQUEST_TEXT", () => {
      ipcRenderer.send("REPLY_TEXT", this.state.text)
    })

    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
    })
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }
}