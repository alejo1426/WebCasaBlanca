import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import DetallesTorneo from '../DetallesViewTorneos/DetallesTorneo';
import DetallesCardTorneos from '../DetallesViewTorneos/DetalleTorneosDisponibles'; // Asegúrate de la ruta correcta

const TorneosView = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from('torneos')
      .select('id, nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, categoria, premios, cupo_maximo, estado');

    if (error) {
      console.error("Error fetching tournaments:", error);
    } else {
      setTournaments(data);
    }
  };

  const fetchTournamentDetails = async (tournament) => {
    setSelectedTournament(tournament);

    if (tournament.estado === 'jugando') {
      const { data, error } = await supabase
        .from('inscripcionestorneos')
        .select('usuarios(nombres)')
        .eq('torneo_id', tournament.id);
      if (!error) {
        setParticipants(data);
      }
    } else if (tournament.estado === 'finalizado') {
      const { data, error } = await supabase
        .from('posiciones')
        .select('posicion, jugador')
        .eq('torneo_id', tournament.id)
        .order('posicion', { ascending: true });
      if (!error) {
        setPositions(data);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Sección de Torneos Disponibles */}
      <div className="lg:w-1/3">
        <DetallesCardTorneos 
          tournaments={tournaments} 
          onTournamentSelect={fetchTournamentDetails} 
        />
      </div>

      {/* Sección de Detalles del Torneo Seleccionado */}
      <div className="lg:w-2/3">
        {selectedTournament ? (
          <DetallesTorneo
            tournament={selectedTournament}
            participants={participants}
            positions={positions}
          />
        ) : (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p>Selecciona un torneo para ver los detalles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TorneosView;
