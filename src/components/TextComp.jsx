import React from "react";
import { makeStyles } from "@material-ui/core";
import ScaleText from "react-scale-text";
import ContentEditable from "react-contenteditable";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TextComp = ({ initialText, textEdit, styles }) => {
  const classes = useStyles();
  const [text, setText] = React.useState(initialText);

  return (
    <ScaleText>
      <ContentEditable
        suppressContentEditableWarning
        contentEditable
        spellCheck={false}
        onClick={textEdit}
        disabled={false}
        html={text}
        onChange={(e) => setText(e.target.value)}
        // onClick={()=>alert("click")}
        onGotPointerCaptureCapture={textEdit}
        // onClick={textClick}
        tagName="p"
        style={{
          whiteSpace: "pre",
          fontFamily: "Arial, sans-serif",
          ...styles,
        }}
      />
    </ScaleText>
  );
};

export default TextComp;
