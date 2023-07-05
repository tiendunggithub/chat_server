
const app = require('express')()
const http = require('http').createServer(app)
const env = require('dotenv').configDotenv()

app.get('/', (req, res) => {
    res.send("Node Server is running on port 5555!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    console.log("have new Connection!");
    userSocket.on("send_message", (data) => {
        console.log("on send_message: ", data);
        userSocket.broadcast.emit("receive_message", data)
    });
	
	userSocket.on("fromClient", data => {
		console.log(data);
		userSocket.emit("fromServer", "test From localhost server. ");
	});
	
})

http.listen(process.env.PORT)