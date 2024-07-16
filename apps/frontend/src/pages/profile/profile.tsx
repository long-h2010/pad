import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { makeStyles } from "tss-react/mui";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import FieldInput from "../../components/field-input";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PrimarySearchAppBar from "../../components/appbar";

function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker />
      </DemoContainer>
    </LocalizationProvider>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles()(() => {
  return {
    frame: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "100%",
      transform: "translate(-50%, -50%)",
      minHeight: "500px",
    },
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "500px",
      boxSizing: "border-box",
      display: "block",
      borderRadius: "10px",
    },
    paperLeft: {
      float: "left",
      width: "30%",
      height: "100%",
      backgroundColor: "white",
      borderRadius: "10px 0 0 10px",
    },
    paperRight: {
      float: "right",
      width: "70%",
      height: "100%",
      backgroundColor: "white",
      borderRadius: "0 10px 10px 0",
      padding: "30px",
    },
    title: {
      color: "black",
      fontWeight: "bold",
      marginBottom: "40px",
    },
    avatar: {
      width: "140px",
      height: "140px",
      margin: "20px auto",
    },
    nameUser: {
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    tab: {
      color: "black",
      "&.Mui-selected": {
        color: "green",
        fontWeight: "bold",
      },
    },
    subtitle: {
      margin: "10px 20px 10px 0",
      fontWeight: "600",
      color: "green",
      textAlign: "left",
      fontSize: "14px",
    },
    input: {
      width: "80%",
      backgroundColor: "white",
      marginBottom: "15px",
      padding: "10px",
      borderRadius: "5px",
      borderColor: "#ededed",
    },
    fieldName: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});

function GenderButtonGroup() {
  const [value, setValue] = React.useState("male");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="gender"
        name="gender"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
    </FormControl>
  );
}

function Profile() {
  const { classes } = useStyles();
  const token = localStorage.getItem("token");
  axios
    .get(import.meta.env.VITE_APP_PROFILE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
    });

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [username, setUsername] = useState("");

  return (
    <>
      <PrimarySearchAppBar />
      <Container maxWidth="md" sx={{ zIndex: 10 }}>
        <style>
          {`
            .css-10d9dml-MuiTabs-indicator {
              background-color: green;
            }
          `}
        </style>
        <Box className={classes.frame}>
          <Box className={classes.paper}>
            <Box className={classes.paperLeft}>
              <Avatar
                className={classes.avatar}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Typography className={classes.nameUser} variant="h5">
                Thao Yi
              </Typography>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab
                  className={classes.tab}
                  label="Profile"
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.tab}
                  label="Password"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <Box className={classes.paperRight}>
              <TabPanel value={value} index={0}>
                <Typography className={classes.title} variant="h4">
                  Profile
                </Typography>
                <Box>
                  <Box className={classes.fieldName}>
                    <FieldInput
                      {...{
                        classNameTitle: classes.subtitle,
                        classNameInput: classes.input,
                        title: "Fullname",
                        type: "text",
                        icon: "",
                        placeholder: "Enter your fullname",
                        setElement: setUsername,
                      }}
                    />
                  </Box>
                  <Box className={classes.fieldName}>
                    <Typography
                      className={classes.subtitle}
                      variant="subtitle1"
                      gutterBottom
                    >
                      Gender
                    </Typography>
                    <Box sx={{ width: "80%" }}>
                      <GenderButtonGroup />
                    </Box>
                  </Box>
                  <Box className={classes.fieldName}>
                    <Typography
                      className={classes.subtitle}
                      variant="subtitle1"
                      gutterBottom
                    >
                      Date of birth
                    </Typography>
                    <Box sx={{ width: "80%" }}>
                      <BasicDatePicker />
                    </Box>
                  </Box>
                  <Box className={classes.fieldName}>
                    <FieldInput
                      {...{
                        classNameTitle: classes.subtitle,
                        classNameInput: classes.input,
                        title: "Email",
                        type: "email",
                        icon: "",
                        placeholder: "Enter your email",
                        setElement: setUsername,
                      }}
                    />
                  </Box>
                  <Box className={classes.fieldName}>
                    <FieldInput
                      {...{
                        classNameTitle: classes.subtitle,
                        classNameInput: classes.input,
                        title: "Nickname",
                        type: "text",
                        icon: "",
                        placeholder: "Enter your nickname",
                        setElement: setUsername,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      float: "right",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      sx={{ marginRight: "10px" }}
                      variant="contained"
                      color="success"
                    >
                      Save
                    </Button>
                    <Button variant="outlined" color="success">
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography className={classes.title} variant="h4">
                  Change password
                </Typography>
                <Box>
                  <FieldInput
                    {...{
                      classNameTitle: classes.subtitle,
                      classNameInput: classes.input,
                      title: "Old password",
                      type: "password",
                      icon: "",
                      placeholder: "Enter your old password",
                      setElement: setUsername,
                    }}
                  />
                  <FieldInput
                    {...{
                      classNameTitle: classes.subtitle,
                      classNameInput: classes.input,
                      title: "New password",
                      type: "password",
                      icon: "",
                      placeholder: "Enter your new password",
                      setElement: setUsername,
                    }}
                  />

                  <FieldInput
                    {...{
                      classNameTitle: classes.subtitle,
                      classNameInput: classes.input,
                      title: "Confirm password",
                      type: "password",
                      icon: "",
                      placeholder: "Enter confirmation password",
                      setElement: setUsername,
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      float: "right",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      sx={{ marginRight: "10px" }}
                      variant="contained"
                      color="success"
                    >
                      Save
                    </Button>
                    <Button variant="outlined" color="success">
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
