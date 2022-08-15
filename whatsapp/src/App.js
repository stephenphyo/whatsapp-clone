import './App.css';
import React, { useEffect, useState } from "react";
import Chatspace from './Chatspace';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import NewRoomPopup from './NewRoomPopup';
import Axios from './Axios';

function App() {

  /* TEMP DATA */
  const username = "Stephen Phyo";
  const userID = "u0001";

  const [roomPopup, setRoomPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomID, setRoomID] = useState('');
  const [showSidebar, setSidebar] = useState(true);
  const [rooms, setRooms] = useState([]);

  const openRoomPopup = () => {
    setRoomPopup(true);
  }

  const closeRoomPopup = () => {
    setRoomPopup(false);
  }

  useEffect(() => {
    Axios.get(`/messages/sync?userid=${userID}`)
      .then((res) => {
        setMessages(res.data);
      })
  }, []);

  useEffect(() => {
    Axios.get(`/rooms/sync?owner=${userID}`)
      .then((res) => {
        setRooms(res.data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('47b5657a8c382c4314ad', {
        cluster: 'ap1'
      });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }
    }, [messages]
  );

  useEffect(() => {
    const pusher = new Pusher('47b5657a8c382c4314ad', {
        cluster: 'ap1'
      });

    const channel = pusher.subscribe('rooms');
    channel.bind('inserted', function(newRoom) {
      setRooms([...rooms, newRoom])
    });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }
    }, [rooms]
  );

  let roomMessages = [];
  rooms.map((room) => {
    console.log("MESSAGES");
    console.log(messages.filter(e => e.roomID===room.roomID));

    roomMessages.push(messages.filter(e => e.roomID===room.roomID).at(-1));

  });
  console.log("ROOM MESSAGE");
  console.log(roomMessages);

  let eachRoomMessages = messages.filter(e => e.roomID===roomID);
  let lastMessage = roomMessages;

  return (
    <div className="app">
      <div className="app__body">
        {showSidebar && <Sidebar
          createNewRoom={openRoomPopup}
          userID={userID}
          setSelectedRoom={setSelectedRoom}
          rooms={rooms}
          setRoomID={setRoomID}
          lastMessage={lastMessage}
        />}
        <Chatspace
          selectedRoom={selectedRoom}
          userID={userID}
          username={username}
          roomID={roomID}
          messages={eachRoomMessages}
          showSidebar={showSidebar}
          setSidebar={setSidebar}
        />
      </div>

      {roomPopup &&
        <div className="app__newRoomPopup">
          <NewRoomPopup
              closeRoomPopup={closeRoomPopup} userID={userID}
            />
        </div>
      }
    </div>
  );
}

export default App;