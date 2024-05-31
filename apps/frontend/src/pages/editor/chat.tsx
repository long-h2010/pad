import React, { useState } from 'react';
import { IoIosChatbubbles } from "react-icons/io";
import ChatDetail from './chatdetail';
import './chat.css'
function Chat ({}) {
    const [showChat, setShowChat] = useState(false);
    return (
        <article>
                <button className={`chat-toggle-button ${showChat ? 'clicked' : ''}`} onClick={() => setShowChat(!showChat)}>
                    <p className='chat-title'>CHAT <IoIosChatbubbles/></p>
                </button>
                <div className={`chat-container ${showChat ? 'open' : ''}`}>
                    <ChatDetail/>
                </div>
        </article>
    );
}

export default Chat;