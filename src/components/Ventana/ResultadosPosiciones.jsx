/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';

const ResultadosPanel = ({ onClose, tournaments, onSavePositions }) => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [positions, setPositions] = useState([]); // Cambiar a un array para posiciones
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (selectedTournament) {
      fetchUsers();
    }
  }, [selectedTournament]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      // Obtener usuarios inscritos al torneo
      const { data, error } = await supabase
        .from('inscripcionestorneos')
        .select('usuario_id')
        .eq('torneo_id', selectedTournament.id);

      if (error) throw error;

      const userIds = data.map(user => user.usuario_id);
      const { data: usersData, error: usersError } = await supabase
        .from('usuarios')
        .select('*')
        .in('id', userIds);

      if (usersError) throw usersError;

      setUsers(usersData);
    } catch (error) {
      const errorMsg = error.message || 'Error al cargar los usuarios.';
      toast.error(errorMsg);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSave = () => {
    // Verifica que se hayan seleccionado usuarios en todas las posiciones
    if (positions.length === 0 || positions.includes(null)) {
      toast.error("Por favor, selecciona usuarios para todas las posiciones.");
      return;
    }

    // Verifica si hay duplicados en el array de posiciones
    const hasDuplicates = positions.some((value, index) => 
      positions.indexOf(value) !== index
    );

    // Si hay duplicados, muestra un mensaje de error
    if (hasDuplicates) {
      toast.error("No puede haber usuarios duplicados en las posiciones.");
      return;
    }

    // Si todo está bien, llama a onSavePositions
    onSavePositions(selectedTournament.id, positions);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md max-h-[80vh] overflow-y-auto relative"> {/* Ajustes para mejorar el espaciado */}
        {/* Botón de cierre */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold">
          &times; {/* Esto representa la "X" */}
        </button>

        <h2 className="text-2xl font-bold mb-4">Seleccionar Posiciones para {selectedTournament ? selectedTournament.nombre : 'torneo'}</h2>

        <label className="block mb-2">Selecciona un Torneo:</label>
        <select 
          value={selectedTournament ? selectedTournament.id : ''} 
          onChange={(e) => {
            const tournament = tournaments.find(t => t.id === parseInt(e.target.value));
            setSelectedTournament(tournament);
            setPositions(new Array(tournament?.inscripciones_actuales).fill(null)); // Inicializar posiciones
          }}
          className="border rounded p-2 mb-4 w-full"
        >
          <option value="" disabled>Seleccione un torneo</option>
          {tournaments.map(torneo => (
            <option key={torneo.id} value={torneo.id}>{torneo.nombre}</option>
          ))}
        </select>

        {selectedTournament && (
          <>
            <h3 className="text-xl font-semibold mb-2">Establecer Posiciones:</h3>
            {Array.from({ length: selectedTournament.inscripciones_actuales }).map((_, index) => ( // Cambiado a inscripciones_actuales
              <div key={index} className="mb-4">
                <label className="block mb-1">Posición {index + 1}:</label>
                <select 
                  value={positions[index] || ''} 
                  onChange={(e) => {
                    const newPositions = [...positions];
                    newPositions[index] = parseInt(e.target.value);
                    setPositions(newPositions);
                  }}
                  className="border rounded p-2 w-full"
                >
                  <option value="" disabled>Seleccione un usuario</option>
                  {loadingUsers ? (
                    <option>Cargando usuarios...</option>
                  ) : (
                    users.map(user => (
                      <option key={user.id} value={user.id}>
                        {`${user.nombres} ${user.apellidos}`} {/* Mostrar nombre completo */}
                      </option>
                    ))
                  )}
                </select>
              </div>
            ))}
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
              Guardar Posiciones
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResultadosPanel;
