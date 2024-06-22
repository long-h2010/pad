import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Message from "./message";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import "./chat.css";

function Chat({}) {
  return (
    <MDBContainer
      style={{
        height: "100%",
        boxShadow: "none",
        borderRadius: "0",
        padding: 0,
      }}
    >
      <MDBCard id="chat1" style={{ height: "100%" }}>
        <MDBCardHeader className="d-flex justify-content-between p-3 text-success border-bottom-s-1">
          <h5 className="mb-0 fw-bold" style={{ margin: 0 }}>
            CHAT
          </h5>
          <p className="m-0">
            <RemoveIcon />
            <CloseIcon />
          </p>
        </MDBCardHeader>

        <MDBCardBody
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Message />
          <MDBTextArea className="form-outline" />
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Chat;
