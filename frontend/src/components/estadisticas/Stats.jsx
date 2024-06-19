import React, { useEffect, useState }  from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Stats = () => {
  const [atendidos, setAtendidos] = useState([]);

  useEffect(() => {
    socket.on('initialize', (data) => {
      setAtendidos(data.atendidos);
    });

    return () => {
      socket.off('initialize');
    };
  }, []);

  return (
    <div>
      <h1>Estadísticas de Tickets Atendidos</h1>
      <ul>
        {atendidos.map((ticket, index) => (
          <li key={index}>Ticket #{ticket.number}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stats