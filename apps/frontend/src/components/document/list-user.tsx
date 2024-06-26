import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/joy/Input";
import { useState } from "react";

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
      content: '""',
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

function ListUser() {
  const [open, setOpen] = useState(false);
  const [editors, setEditors] = useState<string[]>(["Widget 3", "Widget 4"]);
  const [owners, setOwners] = useState<string[]>(["Widget 1", "Widget 2"]);
  const [viewers, setViewers] = useState<string[]>(["Widget 5", "Widget 6"]);

  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(e: React.DragEvent, targetRole: string) {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData("widgetType") as string;

    setOwners(owners.filter((owner) => owner !== widgetType));
    setEditors(editors.filter((editor) => editor !== widgetType));
    setViewers(viewers.filter((viewer) => viewer !== widgetType));

    const targetClassName = (e.target as HTMLElement).className;
    console.log(targetClassName);
    if (targetRole === "owners") {
      setOwners([...owners, widgetType]);
    } else if (targetRole === "editors") {
      setEditors([...editors, widgetType]);
    } else if (targetRole === "viewers") {
      setViewers([...viewers, widgetType]);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: 360,
        height: "fit-content",
        padding: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}>
        <h5 className="list-user-title">Thêm người dùng mới</h5>
        <Button sx={{ color: "black" }} onClick={handleClickOpen}>
          <AddIcon sx={{ marginLeft: 2 }} />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontWeight: "bold", fontSize: "22px" }}
          >
            {"Chia sẻ tài liệu"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex" }}>
            <Input
              name="input-doc-title"
              variant="outlined"
              placeholder="Nhập tên người dùng"
              sx={{ width: 250, marginRight: 2, borderRadius: "4px" }}
            />
            <select
              className="form-select"
              style={{
                display: "inline",
                color: "black",
                width: 180,
                border: "1px rgb(205, 215, 225) solid",
                marginRight: 20,
              }}
            >
              <option value="1">Người chỉnh sửa</option>
              <option value="2">Người xem</option>
            </select>
            <Button variant="outlined" color="success">
              Thêm
            </Button>
          </DialogContent>
          <DialogContent>
            <h6 className="list-user-title">Người sở hữu</h6>
            <Box
              className="owners"
              onDrop={(e) => handleOnDrop(e, "owners")}
              onDragOver={handleDragOver}
              sx={{
                display: "flex",
                height: 50,
                maxHeight: "fit-content",
                alignItems: "center",
                paddingBottom: 1,
              }}
            >
              {owners.map((owner, index) => (
                <Button
                  draggable
                  onDragStart={(e) => handleOnDrag(e, owner)}
                  variant="outlined"
                  key={index}
                >
                  {owner}
                </Button>
              ))}
            </Box>
            <h6 className="list-user-title">Người chỉnh sửa</h6>
            <Box
              className="editors"
              onDrop={(e) => handleOnDrop(e, "editors")}
              onDragOver={handleDragOver}
              sx={{
                display: "flex",
                height: 50,
                maxHeight: "fit-content",
                alignItems: "center",
                paddingBottom: 1,
              }}
            >
              {editors.map((editor, index) => (
                <Button
                  draggable
                  onDragStart={(e) => handleOnDrag(e, editor)}
                  variant="outlined"
                  key={index}
                >
                  {editor}
                </Button>
              ))}
            </Box>
            <h6 className="list-user-title">Người xem</h6>
            <Box
              className="viewers"
              onDrop={(e) => handleOnDrop(e, "viewers")}
              onDragOver={handleDragOver}
              sx={{
                display: "flex",
                height: 50,
                maxHeight: "fit-content",
                alignItems: "center",
                paddingBottom: 1,
              }}
            >
              {viewers.map((viewer, index) => (
                <Button
                  draggable
                  onDragStart={(e) => handleOnDrag(e, viewer)}
                  variant="outlined"
                  key={index}
                >
                  {viewer}
                </Button>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} autoFocus>
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <h6 className="list-user-title">Người sở hữu</h6>
      <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}>
        <StyledBadgeOnline
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadgeOnline>
        <Typography variant="body1" ml={3}>
          Nguyen Thi Thanh Thao
        </Typography>
      </Box>
      <Divider />
      <h6 className="list-user-title">Người chỉnh sửa</h6>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}>
          <StyledBadgeOnline
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </StyledBadgeOnline>
          <Typography variant="body1" ml={3}>
            Nguyen Thi Thanh Thao
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}>
          <StyledBadgeOffline
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </StyledBadgeOffline>
          <Typography variant="body1" ml={3}>
            Huynh Dinh Long
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h6 className="list-user-title">Người xem</h6>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}>
        <StyledBadgeOnline
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadgeOnline>
        <Typography variant="body1" ml={3}>
          Tran Van Anh
        </Typography>
      </Box>
    </Box>
  );
}

export default ListUser;
