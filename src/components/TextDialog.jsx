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
import { v4 as uuid } from "uuid";
import { ChromePicker } from "react-color";
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

const TextDialog = ({ open, onClose, addElement }) => {
  const classes = useStyles();
  const [color, setColor] = React.useState("#000000");
  const [fontSize, setSize] = React.useState(12);
  const [text, setText] = React.useState("");
  const [fontWeight, setWeight] = React.useState(400);
  const [fontFamily, setFamily] = React.useState("");

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
          fontFamily,
        }}
      >
        {text}
      </p>
    );
    addElement(ele);
    onClose();
  };
  
  return (
    <Dialog onClose={onClose} open={open} className={classes.root}>
      <Card style={{ padding: 30 }}>
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
              // label=""0
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Font Size"
              fullWidth
              value={fontSize}
              type="number"
              onChange={(e) => setSize(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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

          <Grid item xs={"12"}>
            <TextField
              label="Font Style"
              value={fontFamily}
              select
              fullWidth
              onChange={(e) => setFamily(e.target.value)}
            >
              {fonts.map((item) => (
                <MenuItem
                  key={uuid()}
                  value={item.value}
                  style={{ fontFamily: item.value }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <ChromePicker
              color={color}
              onChange={handleColor}
              className={classes.colorPicker}
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
