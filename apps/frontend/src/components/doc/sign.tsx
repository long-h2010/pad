import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { makeStyles } from "tss-react/mui";
import { Compact } from "@uiw/react-color";

const SignStyle = makeStyles()(() => {
  return {
    boxColor: {
      width: "20px",
      height: "20px",
      display: "inline-block",
      cursor: "pointer",
      margin: "5px",
    }, 
    sigPadContainer: {
      backgroundColor: "white",
      padding: "0 10px 10px",
    },
    btnClear: {
      border: "none",
      marginLeft: "auto",
      color: "rgb(78, 75, 75)",
      padding: 0,
      display: "block",
      marginTop: "5px",
    },
    sigPadPenColors: {
      display: "inline-block",
      marginRight: "5px",
    },
  };
});

const Sign: React.FC<any> = (props) => {
  const { classes } = SignStyle();
  const { openSign, setOpenSign, handleCloseSign, editorRef } = props;

  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState("");

  // const downloadSign = () => {
  //     const dlink = document.createElement("a");
  //     dlink.setAttribute("href", imageURL);
  //     dlink.setAttribute("download", "signature.png");
  //     dlink.click();
  // };

  const createSign = () => {
    if (sigCanvas.current) {
      const URL = (sigCanvas.current as any)
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setImageURL(URL);
      setOpenSign(false);
    }
  };

  useEffect(() => {
    insertImageAtCursor();
  }, [imageURL]);

  const insertImageAtCursor = () => {
    if (editorRef.current) {
      const editor = editorRef.current as any;
      const selection = editor.selection;

      if (selection && imageURL != "") {
        (editor as any).insertContent(`<img src="${imageURL}" alt="Image" />`);
      }
    }
  };

  const [currentColor, setCurrentColor] = useState("#000");
  const [penColor, setPenColor] = useState("#000");
  const boxColor = useRef<HTMLDivElement>(null);

  const handleOpenColor = () => {
    if (boxColor.current) {
      boxColor.current.style.display = "inline";
    }
  };

  const handleCloseColor = () => {
    if (boxColor.current) {
      boxColor.current.style.display = "none";
    }
  };

  const handleChangeColor = (color: any) => {
    const newColor = color.hex;
    setCurrentColor(newColor);
    handleCloseColor();
  };

  useEffect(() => {
    setPenColor(currentColor);
  }, [currentColor]);

  return (
    <Dialog
      open={openSign}
      onClose={handleCloseSign}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "#106b1f",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "22px",
            }}
          >
            CHỮ KÝ
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.sigPadContainer}>
          <SignatureCanvas
            canvasProps={{ width: 500, height: 200 }}
            ref={sigCanvas}
            penColor={penColor}
          />
          <Button
            className={classes.btnClear}
            onClick={() => {
              if (sigCanvas.current) {
                (sigCanvas.current as any).clear();
              }
            }}
          >
            Xóa
          </Button>
          <Box className={classes.sigPadPenColors}>
            <Box sx={{ textAlign: "center" }}>
              <Typography>Màu bút:</Typography>
              <Box
                sx={{
                  backgroundColor: currentColor,
                  border: "1px solid black",
                  position: "relative",
                }}
                className={classes.boxColor}
                onClick={handleOpenColor}
              ></Box>
            </Box>

            <Box
              ref={boxColor}
              sx={{
                display: "none",
                position: "absolute",
                top: "65%",
                left: "20%",
              }}
            >
              <Compact
                color={currentColor}
                onChange={handleChangeColor}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={createSign}>
          Thêm
        </Button>
        <Button color="success" onClick={handleCloseSign} autoFocus>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Sign;
