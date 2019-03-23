var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io =require("socket.io")(server);
var port = process.env.PORT || 3000;

io.on("connection", client =>{
    console.log("client connected : " , client.id);
    client.emit("acknowlege",{"message":"you are connected"})
    client.on("msgToServer", (chatterName, msg)=> {
        debugger;
        console.log(chatterName + " says : " + msg);
        client.broadcast.emit("ServerMsg : ",chatterName, msg);
        client.emit("ServerMsg : ","Me", msg);
    })

    client.on("testing", function(){console.log("Test")})

    client.disconnect("disconnect",()=>{
        //Message to Save in Mongo;
    })
})

app.get("/",(req,res) => {
    console.log("1");
    res.sendFile(__dirname+ "/public/socket-client.html")
});

server.listen(port,() =>{
console.log("server started with prot ", port);
});