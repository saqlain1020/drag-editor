import React from "react";
import {
  Button,
  Card,
  Dialog,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import ScaleText from "react-scale-text";

const useStyles = makeStyles((theme) => ({
  root: {},
  colorPicker: {
    width: "100% !important",
  },
}));

const fonts = [
  {
    name: "Architects Daughter",
    value: "'Architects Daughter', cursive",
  },
  {
    name: "Caesar Dressing",
    value: "'Caesar Dressing', cursive",
  },
  {
    name: "Calligraffitti',",
    value: "'Calligraffitti', cursive",
  },
  {
    name: "Coming Soon",
    value: "'Coming Soon', cursive",
  },
  {
    name: "Geo",
    value: "'Geo', sans-serif",
  },
  {
    name: "Geostar Fill",
    value: "'Geostar Fill', cursive",
  },
  {
    name: "Lobster",
    value: "'Lobster', cursive",
  },
  {
    name: "Metal Mania",
    value: "'Metal Mania', cursive",
  },
  {
    name: "Miniver",
    value: "'Miniver', cursive",
  },
  {
    name: "Open Sans",
    value: "'Open Sans', sans-serif",
  },
  {
    name: "Permanent Marker",
    value: "'Permanent Marker', cursive",
  },
  {
    name: "Roboto",
    value: "'Roboto', sans-serif",
  },
];

const TextDialog = ({ open, onClose, addElement, textEdit, textClick }) => {
  const classes = useStyles();
  const [text, setText] = React.useState("");

  const submit = () => {
    if (!text) return;
    let ele = (
      <ScaleText>
        <p
         suppressContentEditableWarning
         contentEditable
         spellCheck={false}
          onClick={textEdit}
          // onClick={()=>alert("click")}
          onGotPointerCaptureCapture={textEdit}
          // onClick={textClick}
          style={{
            whiteSpace: "pre",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {text}
        </p>
      </ScaleText>
    );

    addElement(ele);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} className={classes.root}>
      <Card style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              <b>Add Text</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Enter Text"
              multiline
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button variant="contained" color="primary" onClick={submit}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Dialog>
  );
};

export default TextDialog;
