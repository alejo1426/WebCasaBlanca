/* eslint-disable react/prop-types */
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
              <li key={index}>
                {participant.usuarios.nombres} {participant.usuarios.apellidos}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tournament.estado === 'finalizado' && (
        <div className="bg-blue-50 text-gray-900 p-4 rounded mt-4">
          <h3 className="font-bold mb-2">Tabla de Posiciones:</h3>
          <table className="w-full text-left mt-2 border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="border-b py-2 px-4">Posición</th>
                <th className="border-b py-2 px-4">Jugador</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="py-2 border-b px-4">{position.posicion}</td>
                  <td className="py-2 border-b px-4">
                    {position.usuarios.nombres} {position.usuarios.apellidos}
                  </td>
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
