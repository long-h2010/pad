import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import FieldInput from "../../components/field-input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ErrorMessage from "../../components/error-message";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const Information: React.FC<any> = (props) => {
  const classes = props.classes;
  const error = props.error;
  const fullname = props.fullname;
  const setFullname = props.setFullname;
  const gender = props.gender;
  const setGender = props.setGender;
  const birthday = props.birthday;
  const setBirthday = props.setBirthday;
  const email = props.email;
  const setEmail = props.setEmail;
  const nickname = props.nickname;
  const setNickname = props.setNickname;
  const [activeElement, setActiveElement] = useState("");
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  const handleClick = (elementRef: any, elementId: string) => {
    if (activeElement !== elementId) {
      if (box1Ref.current && box2Ref.current) {
        box1Ref.current.style.color =
          elementId === "box1" ? "#289bed" : "rgb(79, 79, 79)";
        box2Ref.current.style.color =
          elementId === "box2" ? "red" : "rgb(79, 79, 79)";
      }
      setActiveElement(elementId);
    }
  };

  return (
    <>
      <Typography className={classes.title} variant="h4">
        Profile
      </Typography>
      <Box>
        <Box className={classes.frame}>
          <FieldInput
            {...{
              classNameTitle: classes.subtitle,
              classNameInput: classes.input,
              title: "Fullname",
              type: "text",
              icon: "",
              value: fullname,
              placeholder: "Enter your fullname",
              setElement: setFullname,
            }}
          />
        </Box>
        <Box sx={{ margin: 0 }} className={classes.frame}>
          <Typography
            className={classes.subtitle}
            variant="subtitle1"
            gutterBottom
          >
            Gender
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              className={classes.boxGender}
              onClick={() => handleClick(box1Ref, "box1")}
              ref={box1Ref}
            >
              <MaleIcon sx={{ fontSize: "34px" }} />
              <Typography sx={{ margin: 0 }} variant="body2" gutterBottom>
                Male
              </Typography>
            </Box>
            <Box
              className={classes.boxGender}
              onClick={() => handleClick(box2Ref, "box2")}
              ref={box2Ref}
            >
              <FemaleIcon sx={{ fontSize: "34px" }} />
              <Typography sx={{ margin: 0 }} variant="body2" gutterBottom>
                Female
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.frame}>
          <Typography
            className={classes.subtitle}
            variant="subtitle1"
            gutterBottom
          >
            Date of birth
          </Typography>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        width: "70%",
                        "& .MuiInputBase-root": {
                          color: "rgb(50, 56, 62)",
                          backgroundColor: "white",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                          borderRadius: "5px",
                          borderColor: "#ededed",
                          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgb(237, 237, 237)", // Change border color
                          },
                          "&:hover fieldset": {
                            borderColor: "darkgreen", // Change border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "darkgreen", // Change border color when focused
                          },
                        },
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
        <Box className={classes.frame}>
          <FieldInput
            {...{
              classNameTitle: classes.subtitle,
              classNameInput: classes.input,
              title: "Email",
              type: "email",
              icon: "",
              value: email,
              placeholder: "Enter your email",
              setElement: setEmail,
            }}
          />
        </Box>
        <Box className={classes.frame}>
          <FieldInput
            {...{
              classNameTitle: classes.subtitle,
              classNameInput: classes.input,
              title: "Nickname",
              type: "text",
              icon: "",
              value: nickname,
              placeholder: "Enter your nickname",
              setElement: setNickname,
            }}
          />
        </Box>
        {error !== "" ? <ErrorMessage {...{ message: error }} /> : <></>}
        <Box
          sx={{
            float: "right",
          }}
        >
          <Button variant="contained" color="success" className={classes.btnSave}>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Information;
