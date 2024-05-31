import { useState } from "react";
import Message from "./message";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBIcon,
    MDBTextArea,
  } from "mdb-react-ui-kit";

function ChatDetail () {
    return (
        <MDBContainer style={{minHeight: 0, background: "none", boxShadow: "none", borderRadius: "0"}}>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol>
                    <MDBCard id="chat1" style={{ borderRadius: "5px" , padding: 0, width: "400px", height: "500px"}}>
                        <MDBCardHeader
                        className="d-flex justify-content-between align-items-center p-3 text-success border-bottom-s-1"
                        style={{
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                        }}
                        >
                        <p className="mb-0 fw-bold" style={{margin: 0}}>CHAT</p>
                        <p className="m-0">
                            <MDBIcon fas icon="minus" style={{paddingRight: "8px"}} />
                            <MDBIcon fas icon="times" />
                        </p>
                        </MDBCardHeader>

                        <MDBCardBody style={{position: "relative"}}>
                            <Message/>
                            <MDBTextArea
                                className="form-outline"
                                id="textAreaExample"
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ChatDetail;