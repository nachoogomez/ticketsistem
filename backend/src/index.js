import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

let ticketNumber = 1;
let tickets = [];
let atendidos = [];

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('initialize', {tickets, atendidos});

    socket.on('nuevoTicket', () => {
        const newTicket ={
            number: ticketNumber++,
        };
        tickets.push(newTicket);
        io.emit('updateTickets', tickets);
    })

    socket.on('atenderTicket', () => {
        if (tickets.length > 0) {
          const ticketAtendido = tickets.shift();
          atendidos.push(ticketAtendido);
          io.emit('updateTickets', tickets);
          io.emit('ticketAtendido', ticketAtendido);
        }
      });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
})