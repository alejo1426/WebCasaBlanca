import { useState, useEffect, useRef } from 'react'; // Añadimos useRef
import { supabase } from '../../../supabaseClient';
import DetallesTorneo from '../DetallesViewTorneos/DetallesTorneo';
import DetallesCardTorneos from '../DetallesViewTorneos/DetalleTorneosDisponibles'; // Asegúrate de la ruta correcta

const TorneosView = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [positions, setPositions] = useState([]);

  // Referencia para la sección de detalles del torneo
  const detailsRef = useRef(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from('torneos')
      .select('id, nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, categoria, premios, cupo_maximo, inscripciones_actuales, estado');
  
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
        .select('usuarios(nombres, apellidos)') // Cargar nombres y apellidos
        .eq('torneo_id', tournament.id);
      if (!error) {
        setParticipants(data);
      }
    } else if (tournament.estado === 'finalizado') {
      const { data, error } = await supabase
        .from('posiciones')
        .select('posicion, usuario_id, usuarios(nombres, apellidos)') // Traer posición y usuario vinculado
        .eq('torneo_id', tournament.id)
        .order('posicion', { ascending: true });
      if (!error) {
        setPositions(data);
      }
    }

    // Desplazarse a la sección de detalles cuando se selecciona un torneo
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Sección de Torneos Disponibles */}
      <div className="lg:w-1/3">
        <div
          className="bg-gray-100 p-6 rounded-lg shadow-md transition-shadow mb-4"
          style={{
            boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)', // Sombra azul personalizada
            transition: 'box-shadow 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)'} // Sombra más azul al pasar el cursor
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)'} // Vuelve a la sombra original
        >
          <DetallesCardTorneos 
            tournaments={tournaments} 
            onTournamentSelect={fetchTournamentDetails} 
          />
        </div>
      </div>

      {/* Sección de Detalles del Torneo Seleccionado */}
      <div className="lg:w-2/3 flex justify-center items-center" ref={detailsRef}> {/* Añadimos la referencia aquí */}
        {selectedTournament ? (
          <div
            className="bg-gray-100 p-6 rounded-lg shadow-md transition-shadow"
            style={{
              boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)', // Sombra azul personalizada
              transition: 'box-shadow 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)'} // Sombra más azul al pasar el cursor
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)'} // Vuelve a la sombra original
          >
            <DetallesTorneo
              tournament={selectedTournament}
              participants={participants}
              positions={positions}
            />
          </div>
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
