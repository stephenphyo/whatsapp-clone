const PATH = require("path");
const mongoose = require("mongoose");
const express = require("express");
const Pusher = require("pusher");
const CORS = require("cors");


/* APP CONFIG */
const app = express();
const PORT = process.env.PORT || 9000;

/* REAL-TIME STREAMING */
const pusher = new Pusher({
    appId: "1337547",
    key: "47b5657a8c382c4314ad",
    secret: "f5753bcc84887678d159",
    cluster: "ap1",
    useTLS: true
  });

/* MIDDLEWARE */
app.use(express.json());
app.use(CORS());


/* MONGOOSE CONFIG */
let db_name = 'STEPHENPHYO';
let db_user = 'stephenphyo';
let db_password = 'ALPHAbetagammatango123';
let connection_url = `mongodb+srv://${db_user}:${db_password}@stephenphyo.pmik2.mongodb.net/${db_name}?retryWrites=true&w=majority`
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.once('open', () => {
    console.log("Successfully connected to MongoDB");

    /* MongoDB Collection */
    const message_collection = db.collection("messages");
    const rooms_collection = db.collection("rooms");

    /* MongoDB Change Stream */
    const message_changeStream = message_collection.watch();
    const rooms_changeStream = rooms_collection.watch();

    /*  Trigger when a Change occurs */
    message_changeStream.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const msg = change.fullDocument;

            /* Pusher Trigger */
            const channel = "messages";
            const event = "inserted";
            pusher.trigger(channel, event, {
                userID: msg.userID,
                username: msg.username,
                message: msg.message,
                timestamp: msg.timestamp,
                sent: msg.sent,
                roomID: msg.roomID
              });
        } else {
            console.log("Error connecting to Pusher Messages");
        }
    })

    rooms_changeStream.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const msg = change.fullDocument;

            /* Pusher Trigger */
            const channel = "rooms";
            const event = "inserted";
            pusher.trigger(channel, event, {
                roomID: msg.roomID,
                roomName: msg.roomName,
                owner: msg.owner,
                members: msg.members,
                createdDate: msg.createdDate,
                groupLogo: msg.groupLogo,
              });
        } else {
            console.log("Error connecting to Pusher Rooms");
        }
    })
})
db.on('error', (err) => {
    console.error(err);
});

/* STATIC */
app.use(express.static(PATH.join(__dirname, '/public')));

/* ROUTES */
app.use('/messages', require(PATH.join(__dirname, 'routes', 'api', 'messages.js')));
app.use('/rooms', require(PATH.join(__dirname, 'routes', 'api', 'rooms.js')));
app.use('/users', require(PATH.join(__dirname, 'routes', 'api', 'users.js')));

/* INDEX PAGE */
app.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(PATH.join(__dirname,'views', 'index.html'));
})

app.listen(PORT, () => {console.log(`Server is listening on Port: ${PORT}`)});