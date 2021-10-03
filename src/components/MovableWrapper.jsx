import React from "react";
import ReactDom from "react-dom";
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
import ImageCropDialog from "./ImageCropDialog";
import CloseIco from "@material-ui/icons/CloseRounded";
import TextStyleBar from "./TextStyleBar";
import TextComp from "./TextComp";
import clsx from "clsx";
import Moveable from "react-moveable";
import { Save } from "@material-ui/icons";
import KitchenIcon from "@material-ui/icons/Kitchen";
import { useScreenshot } from "use-react-screenshot";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    position: "relative",
    width: "100%",
    overflow: "hidden",
    backgroundSize: "cover",
    width: "100%",
    maxWidth: "100vw",
  },
  wrapper: {
    border: "5px dashed blue",
    display: "grid",
    gridTemplateRows: "1fr min-content",
    height: "100%",
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
    // position: "absolute",
    width: "100%",
    // bottom: 0,
  },
  nav: {

  },
  element: {
    outline: "1px solid blue",
    position: "relative",

    
  },
  eleWrap: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  closeIco: {
    position: "absolute",
    background: "white",
    borderRadius: 360,
    top: -25,
    left: -25,
    cursor: "pointer",
    zIndex: 5,
    boxShadow: "1px 2px 5px rgba(0,0,0,0.5)",
  },
  hidden: {
    display: "none !important",
  },
}));

var target = null;

const MovableWrapper = () => {
  const classes = useStyles();
  const [dialog, setDialog] = React.useState(null);
  const [nodes, setNodes] = React.useState([]);
  const [stickerOpen, setStickerOpen] = React.useState(false);
  const [ind, setInd] = React.useState(-1);
  const [stickerAnchor, setStickerAnchor] = React.useState(null);
  const [bg, setBg] = React.useState("");
  const [textAnchor, setTextAnchor] = React.useState(null);
  const [currentTextData, setCurrentTextData] = React.useState(null);
  const containerRef = React.useRef();
  const allRefs = React.useRef([]);
  let json = React.useRef([]);
  const [loaded, setLoaded] = React.useState(false);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = "img.jpg";
    a.click();
  };

  const downloadScreenshot = () =>
    takeScreenShot(containerRef.current).then(download);

  React.useEffect(() => {
    if (loaded) {
      let data = JSON.parse(localStorage.getItem("json"));
      data.forEach((item, ind) => {
        allRefs.current[ind].style.transform = item.position;
      });
      setLoaded(false);
    }
    setTimeout(() => {}, 1000);
  }, [loaded]);

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
  };

  const dragStop = (e, index) => {};

  const resizeEvent = () => {
    window.dispatchEvent(new Event("resize"));
  };

  const handleDelete = (ind) => {
    let newNodes = nodes;
    delete newNodes[ind];
    setNodes([...newNodes]);
    setInd(-1);
  };

  const textEdit = (e) => {
    setTextAnchor(e.currentTarget);
    setCurrentTextData({
      color: e.currentTarget.style.color || "black",
      fontWeight: e.currentTarget.style.fontWeight,
      textDecoration: e.currentTarget.style.textDecoration,
      fontFamily: e.currentTarget.style.fontFamily,
      textAlign: e.currentTarget.style.textAlign,
    });
  };

  const textClick = (e) => {
    console.log("asd");
    if (e.currentTarget === target) {
      console.log("double");
      textEdit(e);
    }
    target = e.currentTarget;
    setTimeout(() => {
      // if (target === e.currentTarget)
      target = null;
    }, 200);
  };

  const wrapperClick = (e) => {
    if (e.target === containerRef.current) {
      setTextAnchor(null);
      setInd(-1);
    }
  };

  const addTextElement = () => {
    let t = "Text";
    let node = <TextComp initialText={t} textEdit={textEdit} />;
    addElement(node);
  };

  const movableOnClick = ({ inputTarget }) => {
    if (inputTarget.classList.contains("closeIcon")) {
      let index = inputTarget.getAttribute("data-index");
      handleDelete(index);
    }
  };

  const targetEdit = (t) => {
    //Text Node
    if (t.childNodes[1].childNodes[0]) {
      let styleObj = t.childNodes[1].childNodes[0].style;
      let text = t.childNodes[1].childNodes[0].innerHTML;
      let style = {
        fontFamily: styleObj.fontFamily,
        fontWeight: styleObj.fontWeight,
        color: styleObj.color,
        textDecoration: styleObj.textDecoration,
        textAlign: styleObj.textAlign,
      };
      let obj = {
        type: "text",
        content: text,
        styles: style,
        transform: t.style.transform,
        index: t.getAttribute("data-index"),
      };
      json.current[obj.index] = obj;
    }
    // Image srd sticker
    else if (t.childNodes[1].src) {
      let obj = {
        type: "img",
        src: t.childNodes[1].src,
        transform: t.style.transform,
        index: t.getAttribute("data-index"),
      };
      json.current[obj.index] = obj;
    }
  };
  const saveFn = () => {
    console.log(json.current);
    allRefs.current.forEach((item, ind) => {
      if (item?.style) json.current[ind].position = item.style.transform;
    });
    localStorage.setItem("json", JSON.stringify(json.current));
    localStorage.setItem("bg", bg);
    console.log("Json:",json.current);
    console.log("Bg",bg);
  };

  const loadLocal = () => {
    setNodes([]);
    let data = JSON.parse(localStorage.getItem("json"));
    json.current = data;
    let nodes = [];
    data.forEach((ele, ind) => {
      if (ele.type === "text") {
        let node = (
          <TextComp
            initialText={ele.content}
            textEdit={textEdit}
            styles={ele.styles}
          />
        );
        nodes[ind] = node;
      } else if ((ele.type = "img")) {
        let node = (
          <img
            className={classes.nav}
            src={ele.src}
            alt=""
            width="100%"
            height="100%"
          />
        );
        nodes[ind] = node;
      }
    });
    setNodes([...nodes]);
    setLoaded(true);
    //BG get
    let bg = localStorage.getItem("bg");
    setBg(bg);
  };
  return (
    <>
      <Moveable
        target={allRefs.current[ind]}
        container={containerRef.current}
        origin={true}
        /* Resize event edges */
        edge={true}
        /* draggable */
        draggable={true}
        throttleDrag={0}
        onClick={movableOnClick}
        onDragStart={({ target, clientX, clientY }) => {
          // console.log("onDragStart", target);
        }}
        onDrag={(
          {
            target,
            beforeDelta,
            beforeDist,
            left,
            top,
            right,
            bottom,
            delta,
            dist,
            transform,
            clientX,
            clientY,
          },
          OnDrag
        ) => {
          // console.log("onDrag left, top", left, top);
          // target!.style.left = `${left}px`;
          // target!.style.top = `${top}px`;
          // console.log("onDrag translate", dist);
          target.style.transform = transform;
        }}
        onDragEnd={({ target, isDrag, clientX, clientY }) => {
          targetEdit(target);
          // console.log("onDragEnd", target, isDrag);
        }}
        /* When resize or scale, keeps a ratio of the width, height. */
        keepRatio={false}
        /* scalable */
        /* Only one of resizable, scalable, warpable can be used. */
        scalable={true}
        throttleScale={0}
        onScaleStart={({ target, clientX, clientY }) => {
          // console.log("onScaleStart", target);
        }}
        onScale={(
          { target, scale, dist, delta, transform, clientX, clientY },
          OnScale
        ) => {
          // console.log("onScale scale", scale);
          target.style.transform = transform;
        }}
        onScaleEnd={({ target, isDrag, clientX, clientY }) => {
          targetEdit(target);
          // console.log("onScaleEnd", target, isDrag);
        }}
        /* rotatable */
        rotatable={true}
        throttleRotate={0}
        onRotateStart={({ target, clientX, clientY }) => {
          // console.log("onRotateStart", target);
        }}
        onRotate={(
          { target, delta, dist, transform, clientX, clientY },
          onRotate
        ) => {
          // console.log("onRotate", dist);
          target.style.transform = transform;
        }}
        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          targetEdit(target);
          // console.log("onRotateEnd", target, isDrag);
        }}
      />
      <div className={classes.wrapper}>
        <div
          className={classes.root}
          ref={containerRef}
          style={{ backgroundImage: `url(${bg})` }}
          onClick={wrapperClick}
        >
          {nodes.map(
            (ele, index) =>
              ele && (
                <div
                  data-index={index}
                  key={index}
                  style={{ width: 300, height: 300 }}
                  className={clsx(classes.eleWrap, "target")}
                  ref={(el) => (allRefs.current[index] = el)}
                  onClick={() => dragStart(null, index)}
                >
                  <CloseIco
                    className={clsx(
                      ind === index ? classes.closeIco : classes.hidden,
                      "closeIcon"
                    )}
                    onClick={() => handleDelete(index)}
                    onGotPointerCapture={() => handleDelete(index)}
                    data-index={index}
                  />
                  {ele}
                </div>
              )
          )}
        </div>

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
            // onClick={() => setDialog("text")}
            onClick={addTextElement}
          />
          <BottomNavigationAction
            label="Crop"
            value="crop"
            icon={<CropIcon />}
            className={classes.nav}
            onClick={() => setDialog("crop")}
          />
          <BottomNavigationAction
            label="Save"
            value="save"
            icon={<Save />}
            className={classes.nav}
            onClick={saveFn}
          />
          <BottomNavigationAction
            label="Load"
            value="load"
            icon={<KitchenIcon />}
            className={classes.nav}
            onClick={loadLocal}
          />
          <BottomNavigationAction
            label="Screenshot"
            value="Screenshot"
            icon={<CropOriginalIcon />}
            className={classes.nav}
            onClick={downloadScreenshot}
          />
        </BottomNavigation>
      </div>
      <TextDialog
        open={dialog === "text"}
        onClose={closeDialog}
        addElement={addElement}
        textEdit={textEdit}
        textClick={textClick}
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
      <TextStyleBar
        open={!!textAnchor}
        anchor={textAnchor}
        onClose={() => setTextAnchor(null)}
        currentTextData={currentTextData}
        setCurrentTextData={setCurrentTextData}
      />
    </>
  );
};

export default MovableWrapper;
