import React from "react";
import { Button, Grid, makeStyles, Popover } from "@material-ui/core";
import stickers from "./stickersSrc";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    maxWidth: 500,
  },
}));

const Sticker = ({ anchorEl, open, onClose, handleSticker }) => {
  const classes = useStyles();
  const [userSrc, setUserSrc] = React.useState([]);

  const handleClick = (src) => {
    handleSticker(src);
    onClose();
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
          setUserSrc([...userSrc, src]);

        };
        fr.readAsDataURL(file);
      }
      console.log(files);
    };
    input.click();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Grid container spacing={2} className={classes.root}>
        {[...stickers, ...userSrc].map((item) => (
          <Grid item>
            <img
              src={item}
              alt="sticker"
              width="100px"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(item)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" color="primary" onClick={handleAddImage}>
            Add Sticker
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default Sticker;
