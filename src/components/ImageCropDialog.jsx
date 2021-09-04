import React from "react";
import { Button, Card, Dialog, makeStyles } from "@material-ui/core";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const ImageCropDialog = ({ open, onClose, imgSrc, setImg }) => {
  const classes = useStyles();
  const [crop, setCrop] = React.useState({});
  let imageRef = React.useRef();

  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if ((imageRef.current, crop.width && crop.height)) {
      const croppedImageUrl = await getCroppedImg(
        imageRef.current,
        crop,
        "newFile.jpeg"
      );
      console.log("cropped");
      setCrop({});
      onClose();
      setImg(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(imgSrc);
          let fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        "image/jpeg",
        1
      );
    });
  };

  const clearBg = () => {
    onClose();
    window.URL.revokeObjectURL(imgSrc);
    setImg("");
  };

  return (
    <Dialog onClose={onClose} open={open} className={classes.root}>
      <Card style={{ padding: 20 }}>
        <ReactCrop
          src={imgSrc}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
        />
        <Button
          fullWidth
          variant="outlined"
          style={{ marginTop: 10 }}
          color="primary"
          onClick={clearBg}
        >
          Clear Background
        </Button>
      </Card>
    </Dialog>
  );
};

export default ImageCropDialog;
