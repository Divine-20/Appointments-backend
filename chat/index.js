let ejs = require('ejs');
const express = require('express')
const app = express()
const path = require('path')
const port = 4500;
const server = app.listen(port,
    console.log(`The server is listening on port ${port}`)
    )
// app.use(express.static(path.join(__dirname + '/public')))
app.use("/static", express.static('./static/'));

const io  = require("socket.io")(server, {
    cors : {
        origin : "*"
    }
})
const users = {}
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('chat');
  });
const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId && 
   users.push({userId,socketId})
   )
   console.log(users);
}
const removeUser = (userId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId
    )
}
//connecting the user
io.on("connection", socket => {
    console.log(socket.id, "User connected");
    //user connected
     socket.on("new-user", name => {
                users[socket.id] = name;
                socket.broadcast.emit("user connected", name)
            })
    //sending message
    socket.on('chat', message => {
    console.log('From client: ', message);
    // io.emit('chat', message)

})   
socket.on('chat', message => {
    console.log('From server: ', message)
  })
//adding user
    socket.on("addUser", (data)=>{
        addUser(data,socket.id);
        socket.broadcast.emit("getUsers",users)
        getUser(socket.id);
    })
 
})
io.on("disconnection", () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    removeUser(socket.id)
})
