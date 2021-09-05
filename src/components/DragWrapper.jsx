import React from "react";
import { makeStyles } from "@material-ui/core";

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
// import Text  from "react-editable-and-draggable-text-2";
import ScaleText from "react-scale-text";
import ImageCropDialog from "./ImageCropDialog";
import CloseIco from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    position: "relative",
    width: "100%",
    overflow: "hidden",
    backgroundSize: "cover",
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
  nav: {
    // "&:focus": {
    //   outline: "1px dashed blue",
    // },
  },
  element: {
    outline: "1px solid blue",
    position: "relative",

    // "&:focus": {
    // },
  },
  eleWrap: {
    width: "100%",
    height: "100%",
  },
  closeIco: {
    position: "absolute",
    background: "white",
    borderRadius: 360,
    top: -10,
    left: -10,
    cursor:"pointer",
    zIndex:5,
    boxShadow:"1px 2px 5px rgba(0,0,0,0.5)"
  },
  hidden:{
    display:"none !important"
  }
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
  const [ind, setInd] = React.useState(-1);
  const [stickerAnchor, setStickerAnchor] = React.useState(null);
  const [bg, setBg] = React.useState("");

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
          setBg(src);
          // let ele = (
          //   <img
          //     className={classes.nav}
          //     src={src}
          //     alt=""
          //     width="100%"
          //     height="100%"
          //   />
          // );
          // addElement(ele);
        };
        fr.readAsDataURL(file);
      }
      console.log(files);
    };
    input.click();
  };

  const handleSticker = (src) => {
    addElement(
      <img
        className={classes.nav}
        src={src}
        alt=""
        width="100%"
        height="100%"
      />
    );
  };

  const closeDialog = () => {
    setDialog(null);
  };

  const addElement = (ele) => {
    setNodes([...nodes, ele]);
    setInd(-1);
  };
  const dragStart = (e, index) => {
    setInd(index);
    // console.log(nodes[index].target)
    // nodes[index].props.style.outline="1px dashed rgb(200,200,200)";
    // e.target.style.border = "1px dashed rgb(200,200,200)";
    // let nd = nodes.find((node) => node === e.target);
    // console.log(index);
  };

  const dragStop = (e, index) => {
    // nodes[index].style.outline="none";
    // console.log(e.target);
    // e.target.style.border = "none";
  };

  const resizeEvent = () => {
    window.dispatchEvent(new Event("resize"));
  };

  const handleDelete = (ind) => {
    let newNodes = nodes;
    delete newNodes[ind];
    setNodes([...newNodes]);
    // let newNodes = nodes.filter((ele, index) => index !== ind);
    // setNodes([...newNodes]);
  };

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${bg})` }}>
      {nodes.map(
        (ele, index) =>
          ele && (
            <Rnd
              key={index}
              className={ind === index && classes.element}
              onDragStart={(e) => dragStart(e, index)}
              onDragStop={(e) => dragStop(e, index)}
              onResize={resizeEvent}
              default={{
                x: 20,
                y: 20,
                width: 200,
                // height: 200,
              }}
            >
              <div className={classes.eleWrap}>
                <CloseIco
                  className={ind === index ? classes.closeIco:classes.hidden}
                  onClick={() => handleDelete(index)}
                />
                {ele}
              </div>
            </Rnd>
          )
      )}

      <BottomNavigation
        className={classes.bottomNav}
        onClick={() => setInd(-1)}
      >
        <BottomNavigationAction
          label="Background"
          value="background"
          icon={<WallpaperIcon />}
          className={classes.nav}
          onClick={handleAddImage}
        />
        <BottomNavigationAction
          label="Stickers"
          value="stickers"
          icon={<MoodIcon />}
          className={classes.nav}
          onClick={(e) => {
            setStickerOpen(e.currentTarget);
            setStickerAnchor(e.currentTarget);
          }}
        />
        <BottomNavigationAction
          label="Text"
          value="text"
          icon={<TextFieldsIcon />}
          className={classes.nav}
          onClick={() => setDialog("text")}
        />
        <BottomNavigationAction
          label="Crop"
          value="crop"
          icon={<CropIcon />}
          className={classes.nav}
          onClick={() => setDialog("crop")}
        />
      </BottomNavigation>
      <TextDialog
        open={dialog === "text"}
        onClose={closeDialog}
        addElement={addElement}
      />
      <ImageCropDialog
        imgSrc={bg}
        setImg={setBg}
        open={dialog === "crop"}
        onClose={closeDialog}
        addElement={addElement}
      />
      <Sticker
        anchorEl={stickerAnchor}
        open={!!stickerOpen}
        onClose={() => setStickerOpen(null)}
        handleSticker={handleSticker}
      />
    </div>
  );
};

export default DragWrapper;
