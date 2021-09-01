import React from "react";
import { Grid, makeStyles, Popover } from "@material-ui/core";
import stickers from "./stickersSrc";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    maxWidth: 500,
  },
}));

const Sticker = ({ anchorEl, open, onClose, handleSticker }) => {
  const classes = useStyles();

  const handleClick = (src) => {
    handleSticker(src);
    onClose();
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
        {stickers.map((item) => (
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
      </Grid>
    </Popover>
  );
};

export default Sticker;
