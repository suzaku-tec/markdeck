import React from "react";
import marked from "marked";
import style from "./Previewer.css";

export default function Previewer(props) {
  return (
    <div
      id="previewer"
      className={`${props.className} ${style.previewer}`}
    >
      <span
        dangerouslySetInnerHTML={{ __html: marked(props.value) }}
      />
    </div>
  );
}
