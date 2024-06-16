import "./home.css";
import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import PrimarySearchAppBar from "../../components/appbar";
import DocumentList from "../../components/doc-list";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import Box from "@mui/material/Box"; 

const actions = [
  { icon: <UploadFileOutlinedIcon />, name: "Import" },
  { icon: <NoteAddOutlinedIcon />, name: "Add" },
];

function OpenIconSpeedDial() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon sx={{color: "black"}} openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={{ backgroundColor: "white", color: "black" }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
function Home() {
  return (
    <main>
      <header>
        <PrimarySearchAppBar />
      </header>
      <div id="docs-content">
        <DocumentList />
      </div>
      <OpenIconSpeedDial />
    </main>
  );
}

export default Home;
