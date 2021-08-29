import React from "react";
import { makeStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextDialog from "./TextDialog";
import { Rnd } from "react-rnd";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  speedDial: {
    position: "absolute",

    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));
const actions = [
  { name: "Text", icon: <TextFieldsIcon />, value: "text" },
  { name: "Image", icon: <ImageIcon />, value: "image" },
  { name: "Box", icon: <CheckBoxOutlineBlankIcon />, value: "box" },
];
const DragWrapper = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [dialog, setDialog] = React.useState(null);
  const [nodes, setNodes] = React.useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddImage = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = () => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
      let file = files[0];
      if (file["type"].split("/")[0] === "image") {
        var fr = new FileReader();
        fr.onload = function () {
          let src = fr.result;
          let ele = <img src={src} alt="" width="100%" height="100%" />;
          addElement(ele);
        };
        fr.readAsDataURL(file);
      }
      console.log(files);
    };
    input.click();
  };
  const dialClick = (v) => {
    if (v === "image") handleAddImage();
    setDialog(v);
    handleClose();
  };
  const closeDialog = () => {
    setDialog(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const addElement = (ele) => {
    setNodes([...nodes, ele]);
  };

  return (
    <div className={classes.root}>
      {nodes.map((ele, index) => (
        <Rnd
          key={index}
          default={{
            x: 20,
            y: 20,
            width: 200,
            // height: 200,
          }}
        >
          {ele}
        </Rnd>
      ))}

      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"up"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => dialClick(action.value)}
          />
        ))}
      </SpeedDial>

      <TextDialog
        open={dialog === "text"}
        onClose={closeDialog}
        addElement={addElement}
      />
    </div>
  );
};

export default DragWrapper;
