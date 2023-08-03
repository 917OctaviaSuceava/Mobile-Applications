/*const express = require("express");
const router = express.Router();

module.exports = router*/



const WebSocket = require('ws');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true });

// Define the Todo schema
const TodoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean
});
const Todo = mongoose.model('Todo', TodoSchema);

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  // Handle incoming messages
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'create':
        // Create a new Todo
        const newTodo = new Todo({
          task: data.task,
          completed: false
        });
        newTodo.save((err) => {
          if (err) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'An error occurred while creating the Todo.'
            }));
          } else {
            ws.send(JSON.stringify({
              type: 'create',
              todo: newTodo
            }));
          }
        });
        break;
      case 'read':
        // Retrieve all Todos
        Todo.find({}, (err, todos) => {
          if (err) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'An error occurred while retrieving the Todos.'
            }));
          } else {
            ws.send(JSON.stringify({
              type: 'read',
              todos: todos
            }));
          }
        });
        break;
      case 'update':
        // Update a Todo
        Todo.findByIdAndUpdate(data.id, { task: data.task, completed: data.completed }, (err) => {
          if (err) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'An error occurred while updating the Todo.'
            }));
          } else {
            ws.send(JSON.stringify({
              type: 'update',
              id: data.id
            }));
          }
        });
        break;
      case 'delete':
        // Delete a Todo
        Todo.findByIdAndDelete(data.id, (err) => {
          if (err) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'An error occurred while deleting the Todo.'
            }));
          } else {
            ws.send(JSON.stringify({
              type: 'delete',
              id: data.id
          }));
        }
      });
        break;
      default:
        console.log('Invalid message type');
    }
  });
});
