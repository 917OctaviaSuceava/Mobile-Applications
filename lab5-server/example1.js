const express = require("express");
const WebSocket = require("ws");
const mongoose = require("mongoose");

// create a new express app
const app = express();

// create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// connect to the MongoDB database
mongoose.connect("mongodb://localhost/movies");

// define the Movie model
const Movie = mongoose.model("Movie", {
  title: String,
  description: String,
  actors: [String]
});

// handle incoming WebSocket connections
wss.on("connection", (ws) => {
  // listen for incoming messages
  ws.on("message", (message) => {
    // parse the message as JSON
    const data = JSON.parse(message);

    // check the action property of the message
    if (data.action === "create") {
      // create a new Movie object
      const movie = new Movie({
        title: data.title,
        description: data.description,
        actors: data.actors
      });

      // save the movie to the database
      movie.save((error) => {
        if (error) {
          ws.send(JSON.stringify({ success: false, error: error.message }));
        } else {
          ws.send(JSON.stringify({ success: true, movie: movie }));
        }
      });
    } else if (data.action === "read") {
      // read all movies from the database
      Movie.find((error, movies) => {
        if (error) {
          ws.send(JSON.stringify({ success: false, error: error.message }));
        } else {
          ws.send(JSON.stringify({ success: true, movies: movies }));
        }
      });
    } else if (data.action === "update") {
      // update a movie in the database
      Movie.findByIdAndUpdate(data.id, {
        title: data.title,
        description: data.description,
        actors: data.actors
      }, (error, movie) => {
        if (error) {
          ws.send(JSON.stringify({ success: false, error: error.message }));
        } else {
          ws.send(JSON.stringify({ success: true, movie: movie })
        ); }
        });
        } 
        else if (data.action === "delete") {
            // delete a movie from the database
            Movie.findByIdAndRemove(data.id, (error) => {
            if (error) {
            ws.send(JSON.stringify({ success: false, error: error.message }));
        } else {
            ws.send(JSON.stringify({ success: true }));
            }
            });
        } else {
            // send an error message if the action is not recognized
            ws.send(JSON.stringify({ success: false, error: "Invalid action" }));
        }
        });
        });

// start the server
wss.listen(8080, () => {
console.log("Server is listening on port 8080");
});

// handle any errors that occur
wss.on("error", (error) => {
console.error(error);
});
