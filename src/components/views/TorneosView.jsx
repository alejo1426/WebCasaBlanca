const TorneosView = () => {
  // Datos ficticios de torneos
  const tournaments = [
    { id: 1, name: 'Torneo Abierto', date: '2024-10-15', status: 'En curso' },
    { id: 2, name: 'Torneo Interclubes', date: '2024-11-01', status: 'Próximo' },
  ];

  // Datos ficticios de playoffs (llaves)
  const playoffs = [
    { round: 'Cuartos de Final', matchups: [['Jugador 1', 'Jugador 2'], ['Jugador 3', 'Jugador 4']] },
    { round: 'Semifinal', matchups: [['Ganador 1', 'Ganador 2']] },
    { round: 'Final', matchups: [['Ganador Semifinal 1', 'Ganador Semifinal 2']] },
  ];

  // Datos ficticios de puntuaciones
  const scores = [
    { id: 1, name: 'Jugador 1', points: 150 },
    { id: 2, name: 'Jugador 2', points: 120 },
    { id: 3, name: 'Jugador 3', points: 100 },
    { id: 4, name: 'Jugador 4', points: 90 },
  ];

  return (
    <div className="flex flex-col lg:flex-row p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Sección de Torneos y Playoffs */}
      <div className="flex-grow">
        {/* Sección de Torneos */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Torneos Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">{tournament.name}</h3>
                <p>Fecha: {tournament.date}</p>
                <p>Estado: {tournament.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Playoffs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Llaves de Playoffs</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {playoffs.map((round, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-bold text-lg mb-2">{round.round}</h4>
                {round.matchups.map(([player1, player2], idx) => (
                  <p key={idx}>
                    {player1} vs {player2}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sección de Tabla de Puntuaciones */}
      <div className="lg:w-1/3">
        <section>
          <h2 className="text-2xl font-bold mb-4">Tabla de Puntuaciones</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b py-2">Jugador</th>
                  <th className="border-b py-2">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.id}>
                    <td className="py-2 border-b">{score.name}</td>
                    <td className="py-2 border-b">{score.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TorneosView;
