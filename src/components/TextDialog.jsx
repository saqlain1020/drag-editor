import React from "react";
import {
  Button,
  Card,
  Dialog,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";

import { ChromePicker } from "react-color";
const useStyles = makeStyles((theme) => ({
  root: {},
  colorPicker: {},
}));

const TextDialog = ({ open, onClose, addElement }) => {
  const classes = useStyles();
  const [color, setColor] = React.useState("#000000");
  const [fontSize, setSize] = React.useState(12);
  const [text, setText] = React.useState("");
  const [fontWeight, setWeight] = React.useState("");

  const handleColor = (color) => {
    setColor(color);
  };
  const submit = () => {
    let ele = (
      <p
        style={{
          color: color.hex,
          fontSize: `${fontSize}px`,
          fontWeight,
          whiteSpace: "pre",
          display: "inline-block",
        }}
      >
        {text}
      </p>
    );
    addElement(ele);
    onClose();
  };
  return (
    <Dialog onclose={onClose} open={open} className={classes.root}>
      <Card style={{ padding: 30 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Enter Text"
              multiline
              rows={6}
              value={text}
              label="text"
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
          
            <ChromePicker
              color={color}
              onChange={handleColor}
              className={classes.colorPicker}
            />
          </Grid>
          <Grid item container spacing={2} xs={6}>
            <Grid item xs={12}>
              <TextField
                label="Font Size"
                value={fontSize}
                type="number"
                onChange={(e) => setSize(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Font Weight"
                value={fontWeight}
                select
                fullWidth
                onChange={(e) => setWeight(e.target.value)}
              >
                <MenuItem value="400">400</MenuItem>
                <MenuItem value="600">600</MenuItem>
                <MenuItem value="800"> 800</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={submit}>Add</Button>
          </Grid>
        </Grid>
      </Card>
    </Dialog>
  );
};

export default TextDialog;
