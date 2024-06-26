import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import React from "react";
import Chat from "../../pages/document/chat/chat";

function ToggleChat() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MessageOutlinedIcon />
      </Button>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Chat />
      </Drawer>
    </div>
  );
}

export default ToggleChat;
