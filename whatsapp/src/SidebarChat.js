import React, { useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import Axios from './Axios';

function SidebarChat({ roomName, setSelectedRoom, setRoomID, lastMessage }) {

    const selectRoom = () => {
        setSelectedRoom(roomName);
        Axios.get(`/rooms/id?roomName=${roomName}`)
            .then((res) => {
                console.log(res.data[0].roomID);
                setRoomID(res.data[0].roomID);
            });
    }

  return (
    <div className="sidebarChat" onClick={selectRoom}>
        <Avatar sx={{ height: '40px', width: '40px' }} />
        <div className="sidebarChat__info">
            <h2>{roomName}</h2>
            <p>{lastMessage}</p>
        </div>
    </div>
  );
}

export default SidebarChat;
