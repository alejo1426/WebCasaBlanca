import React from 'react';

const DetallesTorneo = ({ tournament, participants, positions }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{tournament.nombre}</h2>
      <p><strong>Descripción:</strong> {tournament.descripcion}</p>
      <p><strong>Fecha de inicio:</strong> {tournament.fecha_inicio}</p>
      <p><strong>Fecha de fin:</strong> {tournament.fecha_fin}</p>
      <p><strong>Ubicación:</strong> {tournament.ubicacion}</p>
      <p><strong>Categoría:</strong> {tournament.categoria}</p>
      <p><strong>Premios:</strong> {tournament.premios}</p>
      <p><strong>Cupo máximo:</strong> {tournament.cupo_maximo}</p>
      <p><strong>Inscripciones actuales:</strong> {tournament.inscripciones_actuales}</p>
      <p><strong>Estado:</strong> {tournament.estado}</p>

      {tournament.estado === 'proximo' && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mt-4">
          <p>El torneo aún no ha comenzado.</p>
        </div>
      )}

      {tournament.estado === 'jugando' && (
        <div className="bg-green-100 text-green-800 p-4 rounded mt-4">
          <h3 className="font-bold mb-2">Participantes:</h3>
          <ul className="list-disc ml-5">
            {participants.map((participant, index) => (
              <li key={index}>{participant.usuarios.nombres}</li>
            ))}
          </ul>
        </div>
      )}

      {tournament.estado === 'finalizado' && (
        <div className="bg-gray-200 text-gray-900 p-4 rounded mt-4">
          <h3 className="font-bold mb-2">Tabla de Posiciones:</h3>
          <table className="w-full text-left mt-2">
            <thead>
              <tr>
                <th className="border-b py-2">Posición</th>
                <th className="border-b py-2">Jugador</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr key={index}>
                  <td className="py-2 border-b">{position.posicion}</td>
                  <td className="py-2 border-b">{position.jugador}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DetallesTorneo;
