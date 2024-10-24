import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import FormUser from '../../Form/FormUser';
import FormClases from '../../Form/FormClases';
import FormTorneo from '../../Form/FormTorneos';
import FormCanchas from '../../Form/FormCanchas'; // Importar FormCanchas
import Modal from '../../Ventana/Modal';

const Agregar = () => {
  const [filterType, setFilterType] = useState('clases');
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para recuperar los datos de clases
  const fetchClasses = async () => {
    const { data, error } = await supabase.from('clases').select('*');
    if (error) {
      console.error('Error fetching classes:', error);
    } else {
      setResults(data);
    }
  };

  // Función para recuperar los datos de torneos
  const fetchTournaments = async () => {
    const { data, error } = await supabase.from('torneos').select('*');
    if (error) {
      console.error('Error fetching tournaments:', error);
    } else {
      setResults(data);
    }
  };

  // Función para recuperar los datos de usuarios
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setResults(data);
    }
  };

  // Función para recuperar los datos de canchas
  const fetchCanchas = async () => {
    const { data, error } = await supabase.from('canchas').select('*');
    if (error) {
      console.error('Error fetching canchas:', error);
    } else {
      setResults(data);
    }
  };

  useEffect(() => {
    // Cargar datos según el filtro al inicio
    if (filterType === 'clases') {
      fetchClasses();
    } else if (filterType === 'torneos') {
      fetchTournaments();
    } else if (filterType === 'usuarios') {
      fetchUsers();
    } else if (filterType === 'canchas') {
      fetchCanchas();
    }
  }, [filterType]);

  const handleFilterChange = (selectedFilter) => {
    setFilterType(selectedFilter);
    if (selectedFilter === 'clases') {
      fetchClasses(); // Cargar clases al cambiar el filtro
    } else if (selectedFilter === 'torneos') {
      fetchTournaments(); // Cargar torneos al cambiar el filtro
    } else if (selectedFilter === 'usuarios') {
      fetchUsers(); // Cargar usuarios al cambiar el filtro
    } else if (selectedFilter === 'canchas') {
      fetchCanchas(); // Cargar canchas al cambiar el filtro
    }
  };

  const handleTournamentAdded = () => {
    fetchTournaments(); // Actualiza los usuarios después de agregar uno
  };

  const handleClaseAdded = () => {
    fetchClasses(); // Actualiza las canchas después de agregar una
  };

  const handleUserAdded = () => {
    fetchUsers(); // Actualiza los usuarios después de agregar uno
  };

  const handleCanchaAdded = () => {
    fetchCanchas(); // Actualiza las canchas después de agregar una
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Agregar {filterType}</h2>

      <BarraFiltro onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li key={result.id} className="border p-2 rounded-md shadow">
                {filterType === 'clases' ? result.nombre :
                 filterType === 'torneos' ? result.nombre :
                 filterType === 'usuarios' ? result.nombres :
                 result.nombre // Mostrar nombre para canchas
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Renderiza el formulario correspondiente */}
        <div className="col-span-1">
          {filterType === 'clases' && <FormClases onClassAdded={handleClaseAdded} />}
          {filterType === 'torneos' && <FormTorneo onTournamentAdded={handleTournamentAdded} />}
          {filterType === 'usuarios' && <FormUser onUserAdded={handleUserAdded} />}
          {filterType === 'canchas' && <FormCanchas onCanchaAdded={handleCanchaAdded} />} {/* Renderizar FormCanchas */}
        </div>
      </div>

      {/* Modal para mostrar detalles */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Agregar;
