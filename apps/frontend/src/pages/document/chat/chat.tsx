import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTextArea } from 'mdb-react-ui-kit';
import Message from './message';
import './chat.css'

function Chat({ }) {
    const [showChat, setShowChat] = useState(false);
    return (
        <article>
            <button className={`chat-toggle-button ${showChat ? 'clicked' : ''}`} onClick={() => setShowChat(!showChat)}>
                <p className='chat-title'>Chat</p>
            </button>
            <div className={`chat-container ${showChat ? 'open' : ''}`}>
                <MDBContainer style={{ height: '100%', boxShadow: 'none', borderRadius: '0' }}>
                    <MDBRow className='d-flex justify-content-center'>
                        <MDBCol>
                            <MDBCard id='chat1'>
                                <MDBCardHeader
                                    className='d-flex justify-content-between align-items-center p-3 text-success border-bottom-s-1'
                                    style={{
                                        borderTopLeftRadius: '5px',
                                        borderTopRightRadius: '5px',
                                    }}
                                >
                                    <p className='mb-0 fw-bold' style={{ margin: 0 }}>CHAT</p>
                                    <p className='m-0'>
                                        <MDBIcon fas icon='minus' style={{ paddingRight: '8px' }} />
                                        <MDBIcon fas icon='times' />
                                    </p>
                                </MDBCardHeader>
                                
                                <MDBCardBody>
                                    <Message />
                                    <MDBTextArea
                                        className='form-outline'
                                        id='textAreaExample'
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </article>
    );
}

export default Chat
