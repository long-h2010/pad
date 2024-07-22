import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import UserChip from "./user-chip";

const RoleOfUser: React.FC<any> = (props) => {
  const title = props.title;
  const role = props.role;
  const users = props.users;
  const classes = props.classes;
  const handleOnDrop = props.handleOnDrop;
  const handleDragOver = props.handleDragOver;
  const handleOnDrag = props.handleOnDrag;


  return (
    <>
      <Typography variant="h6" className={classes.titleRule}>
        {title}
      </Typography>
      <Box
        className={classes.boxRule}
        onDrop={(e) => handleOnDrop(e, role)}
        onDragOver={handleDragOver}
      >
        <Stack direction="row" spacing={1}>
          {Object.keys(users).length !== 0 ? (
            (users as any).map((user: any, index: number) => (
              <UserChip key={index} user={user} handleOnDrag={handleOnDrag} />
            ))
          ) : (
            <></>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default RoleOfUser;
