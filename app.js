const express = require('express')
const app = express()
const path = require('path')

const http = require('http')
const socketIo = require('socket.io')

const PORT = 8000

const server = http.createServer(app)

const io = socketIo(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket) =>{
    socket.on("send-location", (data) =>{
        io.emit("receive-location", {id: socket.id, ...data}, ()=>{
            console.log(`Connected User-${socket.id}`)
        });
    })

    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id, ()=>{
            console.log(`User-disconnected ${socket.id}`)
        });
    })
})

app.get("/", (req,res) => {
    res.render("index");
})

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})

