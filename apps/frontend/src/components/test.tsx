import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledBadgeOnline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: `''`,
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#BDBDBD",
    color: "#BDBDBD",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

function Test() {
  const [open, setOpen] = React.useState(false);

  const handleDetailUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={handleDetailUser}
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: 1,
          cursor: "pointer",
        }}
      >
        <StyledBadgeOnline
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="avatar" />
        </StyledBadgeOnline>
        <Box>
          <Typography variant="subtitle1" ml={3}>
            Thanh Thao
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
            ml={3}
          >
            thaoyi
          </Typography>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Information"}</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ display: "flex", padding: "16px 24px" }}>
            <Avatar alt="Remy Sharp" />
            <Box>
              <Typography variant="subtitle1" ml={3}>
                Thanh Thao
              </Typography>
              <Typography variant="body2" ml={3}>
                thaoyi
              </Typography>
            </Box>
          </Box>

          <hr />
          <Box sx={{ width: "300px", padding: "5px 24px 15px 24px" }}>
            <Typography variant="subtitle1">Detail Information</Typography>

            <Box sx={{ display: "flex" }}>
              <Typography variant="subtitle1" mr={3}>
                Giới tính
              </Typography>
              <Typography variant="subtitle1" mr={3}>
                Nữ
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="subtitle1" mr={3}>
                Ngày sinh
              </Typography>
              <Typography variant="subtitle1" mr={3}>
                21/08/2002
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Test;
