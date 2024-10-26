// DetallesCardTorneos.jsx

import React from 'react';

const DetallesCardTorneos = ({ tournaments, onTournamentSelect }) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Torneos Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-white p-4 rounded-lg shadow-xl cursor-pointer hover:bg-gray-300"
            onClick={() => onTournamentSelect(tournament)}
          >
            <h3 className="font-bold text-lg">{tournament.nombre}</h3>
            <p>Fecha de inicio: {tournament.fecha_inicio}</p>
            <p>Fecha de fin: {tournament.fecha_fin}</p>
            <p>Estado: {tournament.estado}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetallesCardTorneos;
