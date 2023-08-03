const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WebSocket = require('ws');

const PORT = 8080;

//require('./movie.js');

const mongoURL = "mongodb+srv://octavia:pPxVJjueebItJ92d@cluster0.ajjfnib.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

async function connect()
{
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
    }
    catch(error)
    {
        console.log(error);
    }
}
connect();

const http = require('http');
const server = http.createServer(app);
const MovieSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    datetime: String,
    actors: String
}, { versionKey: false, timestamps: true });

const Movie = mongoose.model('Movie', MovieSchema);

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    console.log("A new client connected");
    ws.send("Welcome new client!");
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log("received a message " + data.action);
        switch (data.action) {
            case 'create':
                // ADD MOVIE
                const movie = new Movie({
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    datetime: data.datetime,
                    actors: data.actors
                  });
                  console.log("create: " + data.title, data.description, data.duration, data.datetime, data.actors);
            
                  // save the movie to the database
                  movie.save((error) => {
                    if (error) {
                        console.log(error)
                      ws.send(JSON.stringify({ success: false, error: error.message }));
                    } else {
                        console.log("success")
                      ws.send(JSON.stringify({ success: true, movie: movie }));
                    }
                  });
                break;
            case 'read':
                Movie.find((error, movies) => {
                    if (error) {
                        console.log(error);
                      ws.send(JSON.stringify({ success: false, error: error.message }));
                    } else {
                      ws.send(JSON.stringify({ success: true, movies: movies }));
                    }
                  });
                break;
            case 'update':
                // update a movie in the database
                Movie.findByIdAndUpdate(data.id, {
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    datetime: data.datetime,
                    actors: data.actors
                }, (error, movie) => {
                    if (error) {
                        ws.send(JSON.stringify({ success: false, error: error.message }));
                    } 
                    else {
                        ws.send(JSON.stringify({ success: true, movie: movie })
                    ); }
                    });
                break;
            default:
                console.log('Invalid message type');
        }
        
    });
    ws.on('close', () => {
        console.log("client disconnected");
    });
});

app.get("/", function(req, res) {
    res.json({success: true, message: "welcome to backend"});
});

server.listen(PORT, function() {
    console.log("Server is listening at " + PORT);
});
