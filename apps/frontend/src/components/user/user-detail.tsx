import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from 'react';

const DetailUser: React.FC<any> = (props) => {
	const classes = props.classes;
	const avatar = props.avatar;
	const name = props.name;
	const nickname = props.nickname;
  const [openDetailUser, setOpenDetailUser] = useState(false);


  const handleOpen = () => {
    setOpenDetailUser(true);
  };

  const handleClose = () => {
    setOpenDetailUser(false);
  };

	return (
    <Dialog
      open={handleOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.headerUser}>
        <Box>
          <Typography className={classes.headerTitle} variant="h6">
            User Information
          </Typography>
        </Box>
        <Box>
          <Button
            className={classes.closeBtn}
            // onClick={() => toggleDrawer(!open)}
          >
            <Close />
          </Button>
        </Box>
      </DialogTitle>
      <Divider className={classes.divider} />
      <DialogContent sx={{ padding: 0 }}>
        <Box className={classes.boxDetailPrimary}>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            className={classes.avatarUser}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} ml={3}>
				{name}
            </Typography>
            <Typography variant="body2" ml={3}>
              {nickname}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.boxDetailSecondary}>
          <Typography variant="subtitle1" className={classes.subTitle}>
            Detail Information
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Typography className={classes.column} variant="subtitle1" mr={3}>
              Giới tính
            </Typography>
            <Typography className={classes.column} variant="subtitle1" mr={3}>
              Nữ
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography className={classes.column} variant="subtitle1" mr={3}>
              Ngày sinh
            </Typography>
            <Typography className={classes.column} variant="subtitle1" mr={3}>
              21/08/2002
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DetailUser;