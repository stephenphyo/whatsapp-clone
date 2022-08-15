import React, { useState, useRef, useEffect } from 'react';
import './Chatspace.css';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Axios from './Axios';


function Chatspace({ messages, selectedRoom, userID, username, roomID, showSidebar, setSidebar }) {

    const [input, setInput] = useState("");

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const toggleSidebar = () => {
        if (showSidebar == false) {
            setSidebar(true);
        } else {
            setSidebar(false);
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input === '') {
            return;
        }
        await Axios.post('/messages/new', {
            userID: userID,
            username: username,
            message: input,
            timestamp: new Date().toLocaleTimeString(),
            sent: true,
            roomID: roomID
        });
        setInput('');
    };

  return (
    <div className = {`chatspace ${!showSidebar && "full"}`}>
        <div className="chatspace__header">
            {showSidebar && <IconButton onClick={toggleSidebar}>
                <ArrowLeftIcon style={{ fontSize: '25px' }} />
            </IconButton>}
            {!showSidebar && <IconButton onClick={toggleSidebar}>
                 <MenuIcon style={{ fontSize: '25px' }} />
            </IconButton>}
            <Avatar />
            <div className="chatspace__header__info">
                <h3>{selectedRoom}</h3>
                <p>Last seen at ... {roomID}</p>
            </div>
            <div className="chatspace__header__right">
                <IconButton>
                    <SearchIcon />
                </IconButton>

                <input
                    id="attach-file"
                    name="attach-file"
                    type="file"
                    style={{ display: 'none' }}
                />
                <label htmlFor="attach-file">
                    <IconButton component="span">
                        <AttachFileIcon />
                    </IconButton>
                </label>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className="chatspace__body">
            <div className="chatspace__chat">
                {messages.map((message) => (
                    <p className={`chat__message ${message.sent && "chat__sender"}`}>
                        <span className="chat__user">{message.username}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>
            <div ref={messagesEndRef} />
        </div>

        <div className="chatspace__footer">
            <div  className="btn_emoji">
                <IconButton><InsertEmoticonIcon /></IconButton>
            </div>
            <form>
                <input
                    placeholder="Type message"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button onClick={sendMessage} type="submit"></button>
                <div className="btn_mic">
                    <IconButton><MicIcon /></IconButton>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Chatspace