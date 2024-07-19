import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import GroupStyles from "./style";
import ListUser from "./list-user";
import RoleOfUser from "../../../components/users-role";
import SearchForm from "../../../components/search-form";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Test from "../../../components/test";

function UsersGroup() {
  const { classes } = GroupStyles();
  const docId = useParams().id;
  const doc_url = import.meta.env.VITE_APP_DOCUMENTS_URL;
  const [open, setOpen] = useState(false);
  const [owners, setOwners] = useState([]);
  const [writers, setWriters] = useState([]);
  const [readers, setReaders] = useState([]);
  const [ownersTemp, setOwnersTemp] = useState([]);
  const [writersTemp, setWritersTemp] = useState([]);
  const [readersTemp, setReadersTemp] = useState([]);

  useEffect(() => {
    axios
      .get(doc_url + "get-list-user/" + docId)
      .then((res) => {
        setOwners(res.data.owners);
        setWriters(res.data.writers);
        setReaders(res.data.readers);
      })
      .catch((err) => {
        console.log("Error when retrieving documents data: ", err);
      });
  }, []);

  const updateRole = () => {
    const nicknames = {
      owners: owners.map((owner: any) => {
        return owner.nickname;
      }),
      writers: writers.map((writer: any) => {
        return writer.nickname;
      }),
      readers: readers.map((reader: any) => {
        return reader.nickname;
      }),
    };

    axios
      .put(doc_url + docId + "/update-role", { nicknames: nicknames })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  };

  const handleOnDrag = (e: React.DragEvent, widget: any) => {
    e.dataTransfer.setData("widget", JSON.stringify(widget));
  };

  const handleOnDrop = (e: React.DragEvent, targetRole: string) => {
    const widget: any = JSON.parse(e.dataTransfer.getData("widget"));

    setOwners(owners.filter((owner) => !_.isEqual(owner, widget)));
    setWriters(writers.filter((writer) => !_.isEqual(writer, widget)));
    setReaders(readers.filter((reader) => !_.isEqual(reader, widget)));

    if (targetRole === "owner") {
      setOwners(_.uniqWith([...owners, widget], _.isEqual) as any);
    } else if (targetRole === "writer") {
      setWriters(_.uniqWith([...writers, widget], _.isEqual) as any);
    } else if (targetRole === "reader") {
      setReaders(_.uniqWith([...readers, widget], _.isEqual) as any);
    }
  };

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  const handleOpen = () => {
    setOwnersTemp(owners);
    setWritersTemp(writers);
    setReadersTemp(readers);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    updateRole();
    handleClose();
  };

  const handleCancel = () => {
    setOwners(ownersTemp);
    setWriters(writersTemp);
    setReaders(readersTemp);
    handleClose();
  };

  const [listUsers, setListUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUser = useCallback(async () => {
    console.log(import.meta.env.VITE_APP_USER_URL + `get-users/${search}`);
    try {
      axios
        .get(import.meta.env.VITE_APP_USER_URL + `get-users/${search}`)
        .then((res) => {
          const newListUser = res.data.map((user: any) => {
            const { _id, name, nickname } = user;
            return { id: _id, name, nickname };
          });
          setListUsers(newListUser);
        })
        .catch((err) => {
          console.log("Error when fetch documents data: ", err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    fetchUser();
  }, [search, fetchUser]);

  const [age, setAge] = useState<string | number>('owner');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };


  return (
    <Box className={classes.boxContainer}>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h6" className={classes.headerTitle}>Thêm người dùng mới</Typography>
          <Button sx={{ color: "green" }} onClick={handleOpen}>
            <Add/>
          </Button>
        </Box>
        <Test/>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
          >
            <Typography className={classes.headerTitle} variant="h5">
              CHIA SẺ TÀI LIỆU
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ display: "flex" }}>
            <SearchForm setSearch={setSearch} />
            <List className={classes.listUser}>
              <ListItem sx={{ padding: 0 }}>
                <ListItemAvatar sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar className={classes.avatarUser}>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Thanh Thao" secondary="thaoyi" />
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <ListItemAvatar sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar className={classes.avatarUser}>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Thanh Thao" secondary="thaoyi" />
              </ListItem>
            </List>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age} className={classes.selectRule} onChange={handleChange}
            >
              <MenuItem value="owner">Người sở hữu</MenuItem>
              <MenuItem value="writer">Người chỉnh sửa</MenuItem>
              <MenuItem value="reader">Người xem</MenuItem>
            </Select>
            <Button variant="outlined" color="success">
              Thêm
            </Button>
          </DialogContent>
          <DialogContent>
            <RoleOfUser
              {...{
                title: "Người sở hữu",
                role: "owner",
                users: owners,
                classes: classes,
                handleOnDrop: handleOnDrop,
                handleDragOver: handleDragOver,
                handleOnDrag: handleOnDrag,
              }}
            />
            <RoleOfUser
              {...{
                title: "Người chỉnh sửa",
                role: "writer",
                users: writers,
                classes: classes,
                handleOnDrop: handleOnDrop,
                handleDragOver: handleDragOver,
                handleOnDrag: handleOnDrag,
              }}
            />
            <RoleOfUser
              {...{
                title: "Người xem",
                role: "reader",
                users: readers,
                classes: classes,
                handleOnDrop: handleOnDrop,
                handleDragOver: handleDragOver,
                handleOnDrag: handleOnDrag,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={handleSave}>
              Cập nhật
            </Button>
            <Button color="success" onClick={handleCancel} autoFocus>
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      <ListUser classes={classes} owners={owners} writers={writers} readers={readers} />
    </Box>
  );
}

export default UsersGroup;