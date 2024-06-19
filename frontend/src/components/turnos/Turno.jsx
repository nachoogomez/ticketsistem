import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import io from 'socket.io-client';
import sound from '../../assets/audio.mp3'

const socket = io("http://localhost:4000")


const Turno = () => {
  const [tickets, setTickets] = useState([]);
  const [atendidos, setAtendido] = useState([]);
  const notify = () => toast('Turno generado con exito!');

  useEffect(() =>{
    socket.on('initialize', (data) =>{
      setTickets(data.tickets);
    })

    socket.on('updateTickets', (tickets) =>{
      setTickets(tickets);
    
    })


    socket.on('ticketAtendido', (ticket ) => {
      setAtendido(ticket);
    });

    return () => {
      socket.off('initialize');
      socket.off('updateTickets');
      socket.off('ticketAtendido');
    };
  }, []);

  const play = () =>{
    new Audio(sound).play();
  }

  const handleNuevoTicket = () => {
    socket.emit('nuevoTicket');
    notify(); 
  };

  const handleAtenderTicket = () => {
    socket.emit('atenderTicket');
    play();

  };
  
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-600">Siguiente turno</h1>
          <h2 className="text-6xl font-bold text-blue-500 my-4">Turno</h2>
          
          {atendidos ? <h3 className="text-6xl font-bold text-blue-500 mb-4">Ticket #{atendidos.number}</h3> : <h3 className="text-6xl font-bold text-blue-500 mb-4">No hay ticket</h3>} 
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
          {tickets.slice(0, 3).map((ticket, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg w-1/3 text-center">
              <h4 className="text-lg font-bold text-gray-600">Turno {ticket.number}</h4>
              <p className="text-sm text-gray-500">En espera</p>
            </div> 
          ))}
          </div> 
        </div>
      </div>
      <div>
      <div class="flex flex-row gap-4">
          <button onClick={handleAtenderTicket} id="1" className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> 
            Llamar Box #1
          </button>
          <button onClick={handleAtenderTicket} id="2" className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> 
            Llamar Box #2
          </button>
          <button onClick={handleNuevoTicket} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Generar nuevo ticket
          </button>
          <Toaster/>
        </div>
      </div>
    </div>
  )
}

export default Turno