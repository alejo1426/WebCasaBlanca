import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import CardItem from '../Card/CardItem';
import DetallesClase from '../DetallesResultados/DetallesClases'; 
import DetallesTorneo from '../DetallesResultados/DetallesTorneos';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultadosPanel from '../Ventana/ResultadosPosiciones'; // Asegúrate de importar el componente modificado

const GestorView = () => {
  const [resultados, setResultados] = useState([]);
  const [torneos, setTorneos] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingTournaments, setLoadingTournaments] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [instructorId, setInstructorId] = useState(null);
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [finalizedTournaments, setFinalizedTournaments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { id } = jwtDecode(token) || {};
      setInstructorId(id);
    }
  }, []);

  useEffect(() => {
    if (instructorId) {
      fetchClasses();
      fetchTournaments();
    }
  }, [instructorId]);

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try {
      const { data, error } = await supabase
        .from('clases')
        .select('*, usuarios(nombres, apellidos)')
        .eq('instructor_id', instructorId);
  
      if (error) throw error;
  
      setResultados(data);
    } catch (error) {
      const errorMsg = error.message || 'Error al cargar las clases.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoadingClasses(false);
    }
  };

  const fetchTournaments = async () => {
    setLoadingTournaments(true);
    try {
      const { data, error } = await supabase
        .from('torneos')
        .select('*')
        .eq('instructor_id', instructorId);

      if (error) throw error;

      setTorneos(data);
      const finalized = data.filter(torneo => torneo.estado === 'finalizado');
      setFinalizedTournaments(finalized);
    } catch (error) {
      const errorMsg = error.message || 'Error al cargar los torneos.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoadingTournaments(false);
    }
  };

  const fetchEnrolledUsers = async (id, type) => {
    setLoadingUsers(true);
    try {
      const table = type === 'class' ? 'inscripcionesclases' : 'inscripcionestorneos';
      const { data: inscriptions, error: inscriptionsError } = await supabase
        .from(table)
        .select('usuario_id')
        .eq(type === 'class' ? 'clase_id' : 'torneo_id', id);

      if (inscriptionsError) throw inscriptionsError;

      const userIds = inscriptions.map(inscription => inscription.usuario_id);
      const { data: users, error: usersError } = await supabase
        .from('usuarios')
        .select('*')
        .in('id', userIds);

      if (usersError) throw usersError;

      setEnrolledUsers(users);
    } catch (error) {
      const errorMsg = error.message || 'Error al cargar los usuarios inscritos.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleClassSelect = async (claseId) => {
    const selected = resultados.find(clase => clase.id === claseId);
    setSelectedClass(selected);
    setSelectedTournament(null);
    await fetchEnrolledUsers(claseId, 'class');
  };

  const handleTournamentSelect = async (torneoId) => {
    const selected = torneos.find(torneo => torneo.id === torneoId);
    setSelectedTournament(selected);
    setSelectedClass(null);
    await fetchEnrolledUsers(torneoId, 'tournament');
  };

  const toggleResultsPanel = () => {
    setShowResultsPanel(!showResultsPanel);
  };

  const savePositions = async (torneoId, positions) => {
    try {
      // Asegúrate de ajustar el formato según la estructura de tu tabla de posiciones
      const positionData = positions.map((usuario_id, index) => ({
        torneo_id: torneoId,
        usuario_id,
        posicion: index + 1 // Asigna la posición basada en el índice
      }));

      const { data, error } = await supabase
        .from('posiciones')
        .upsert(positionData); // Inserta o actualiza los datos

      if (error) throw error;

      toast.success("Posiciones guardadas exitosamente.");
      toggleResultsPanel();
    } catch (error) {
      const errorMsg = error.message || "Error al guardar las posiciones.";
      toast.error(errorMsg);
    }
  };

  const renderSection = (title, loading, data, type, onSelect) => (
    <section className="mb-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {loading ? (
        <p className="text-center text-lg">Cargando {title.toLowerCase()}...</p>
      ) : data.length === 0 ? (
        <p>No hay {title.toLowerCase()} disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(item => (
            <CardItem key={item.id} item={item} type={type} onSelect={() => onSelect(item.id)} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="flex-grow p-4">
        {renderSection('Mis Clases', loadingClasses, resultados, 'class', handleClassSelect)}
        {renderSection('Mis Torneos', loadingTournaments, torneos, 'tournament', handleTournamentSelect)}
        <button 
          onClick={toggleResultsPanel} 
          className="bg-blue-600 text-white px-4 py-2 rounded mx-auto block mb-4"> {/* mx-auto para centrar en un contenedor de bloque */}
          Resultados
        </button>
      </div>

      <div className="w-full lg:w-1/2 p-4 lg:p-6">
        {selectedClass ? (
          <DetallesClase clase={selectedClass} enrolledUsers={enrolledUsers} />
        ) : selectedTournament ? (
          <DetallesTorneo torneo={selectedTournament} enrolledUsers={enrolledUsers} />
        ) : (
          <p className="text-center">Selecciona una clase o torneo para ver los detalles.</p>
        )}
      </div>

      <ToastContainer />

      {showResultsPanel && (
        <ResultadosPanel 
          onClose={toggleResultsPanel} 
          tournaments={finalizedTournaments} 
          onSavePositions={savePositions} // Cambiar de onSavePodium a onSavePositions
        />
      )}
    </div>
  );
};

export default GestorView;
