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
import ImageIcon from "@material-ui/icons/Image";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextDialog from "./TextDialog";
import { Rnd } from "react-rnd";
import { v4 as uuid } from "uuid";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MoodIcon from "@material-ui/icons/Mood";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CropIcon from "@material-ui/icons/Crop";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import Sticker from "./Sticker";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    position: "relative",
    width: "100%",
    overflow: "hidden",
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
  bottomNav: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
}));
const actions = [
  { name: "Text", icon: <TextFieldsIcon />, value: "text" },
  { name: "Image", icon: <ImageIcon />, value: "image" },
  { name: "Box", icon: <CheckBoxOutlineBlankIcon />, value: "box" },
];
const DragWrapper = () => {
  const classes = useStyles();
  const [dialog, setDialog] = React.useState(null);
  const [nodes, setNodes] = React.useState([]);
  const [stickerOpen, setStickerOpen] = React.useState(false);

  
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
 
const handleSticker=(src)=>{
  addElement(<img src={src} alt="" width="100%" height="100%" />)
}

  const closeDialog = () => {
    setDialog(null);
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

      <BottomNavigation className={classes.bottomNav}>
        <BottomNavigationAction
          label="Background"
          value="background"
          icon={<WallpaperIcon />}
          onClick={handleAddImage}
        />
        <BottomNavigationAction
          label="Stickers"
          value="stickers"
          icon={<MoodIcon />}
          onClick={(e)=>setStickerOpen(e.currentTarget)}
        />
        <BottomNavigationAction
          label="Text"
          value="text"
          icon={<TextFieldsIcon />}
          onClick={() => setDialog("text")}
        />
        <BottomNavigationAction label="Crop" value="crop" icon={<CropIcon />} />
      </BottomNavigation>
      <TextDialog
        open={dialog === "text"}
        onClose={closeDialog}
        addElement={addElement}
      />
      <Sticker anchorEl={stickerOpen} open ={!!stickerOpen} onClose={()=>setStickerOpen(null)} handleSticker={handleSticker}/>
    </div>
  );
};

export default DragWrapper;
