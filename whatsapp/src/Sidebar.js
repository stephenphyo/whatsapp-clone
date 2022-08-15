import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import Axios from './Axios';
import Pusher from 'pusher-js';

function Sidebar({ createNewRoom, userID, setSelectedRoom, rooms, setRoomID, lastMessage }) {

  return (
    <div className='sidebar'>
        <div className="sidebar__header">
            <Avatar
                src="https://mk0anatomieunes58h83.kinstacdn.com/wp-content/themes/cera/assets/images/avatars/user-avatar.png"
                sx={{ height: '50px', width: '50px' }}
            />
            <div className="sidebar__header__right">
                <IconButton>
                    <RefreshIcon  style={{ fontSize: 25 }} />
                </IconButton>
                <IconButton>
                    <ChatBubbleIcon style={{ fontSize: 25 }} />
                </IconButton >
                <IconButton>
                    <SettingsIcon style={{ fontSize: 25 }} />
                </IconButton>
            </div>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__search__container">
                <SearchIcon />
                <input placeholder="Search or start new chat" type="text" />
            </div>
        </div>

        <div className="sidebar__chats">
            <div className="sidebar__addRoom">
                <button onClick={createNewRoom}>+ Add New Room</button>
            </div>
                {rooms.map((room) => (
                    <SidebarChat
                        roomName={room.roomName}
                        setSelectedRoom={setSelectedRoom}
                        setRoomID={setRoomID}
                        lastMessage={lastMessage.message}
                    />
                    ))
                }
        </div>
    </div>
  )

}

export default Sidebar