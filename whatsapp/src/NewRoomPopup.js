import React, { useState } from 'react';
import './NewRoomPopup.css';
import Axios from './Axios';
const { v4: uuid } = require("uuid");

function NewRoomPopup({ closeRoomPopup, userID }) {

    const [roomName, setRoomName] = useState("");
    const roomID = uuid();

    const createRoom = (e) => {
        e.preventDefault();

        Axios.post('/rooms/new', {
            roomID: roomID,
            roomName: roomName,
            owner: userID,
            members: [],
            createdDate: new Date().toLocaleString(),
            groupLogo: "Some Logo"
        });

        Axios.put(`/users/update/room?userID=${userID}&roomID=${roomID}`);

        closeRoomPopup();
    }

  return (
    <div className="RoomPopup">
        <button className="x-icon" onClick={closeRoomPopup}>X</button>
        <form>
            <h2>Create New Room</h2>
            <input
                type='text' placeholder='Enter Room Name'
                value={roomName} onChange={e => setRoomName(e.target.value)}
            />
            <button type="submit" onClick={createRoom} id="btn_createRoom">Create Room</button>
        </form>
    </div>
  );
}

export default NewRoomPopup;