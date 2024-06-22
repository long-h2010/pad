import { Editor } from "@tinymce/tinymce-react";
import "./editor.css";
import * as React from "react";
import Input from "@mui/joy/Input";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ToggleChat from "../../../components/document/toggle-chat";


const StyledBadge = styled(Badge)(({ theme }) => ({
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

function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>
    </Stack>
  );
}

function MyEditor(data: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="container">
      <div className="docs-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            name="input-doc-title"
            variant="outlined"
            color="success"
            sx={{ width: "30%", border: "none" }}
          />
          <div style={{ display: "flex" }}>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <GroupsIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>{BadgeAvatars()}Thao</MenuItem>
              <MenuItem onClick={handleClose}>{BadgeAvatars()}Long</MenuItem>
            </Menu>
            <ToggleChat />
          </div>
        </div>
      </div>
      <Editor
        apiKey="tok1lhzg5h155ewt8cpsahu9pcvc5sh95ufqmjluksnky6ot"
        init={{
          plugins:
            "fullscreen save pagebreak anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags pagebreak | spellcheckdialog typography | alignleft aligncenter alignright alignjustify lineheight | checklist numlist bullist indent outdent | emoticons charmap | fullscreen removeformat preview save",
          menubar: "favs file edit view insert format tools table help",
          fullscreen_native: true,
        }}
        value={data.content}
        onEditorChange={data.handleEditText}
      />
    </div>
  );
}

export default MyEditor;
