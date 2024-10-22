import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import FormUser from '../../Form/FormUser';
import FormClases from '../../Form/FormClases';
import FormTorneo from '../../Form/FormTorneos';
import FormCanchas from '../../Form/FormCanchas'; // Importar el formulario de canchas
import Modal from '../../Ventana/Modal';// Importar el componente Modal

const Agregar = () => {
  const [filterType, setFilterType] = useState('clases');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchResults = async (filter, search) => {
    let query;

    switch (filter) {
      case 'clases':
        query = supabase.from('clases');
        break;
      case 'usuarios':
        query = supabase.from('usuarios');
        break;
      case 'torneos':
        query = supabase.from('torneos');
        break;
      case 'canchas':
        query = supabase.from('canchas');
        break;
      default:
        return;
    }

    if (search) {
      let { data: fetchedData, error } = await query
        .select('*')
        .or(
          filter === 'usuarios'
            ? `nombres.ilike.%${search}%,apellidos.ilike.%${search}%`
            : `nombre.ilike.%${search}%` // Para clases, torneos y canchas
        );

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setResults(fetchedData);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchResults(filterType, searchTerm);
    } else {
      setResults([]);
    }
  }, [filterType, searchTerm]);

  const handleFilterChange = (selectedFilter) => {
    setFilterType(selectedFilter);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleDataClick = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Agregar {filterType}</h2>

      <BarraFiltro onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <p>Mostrando resultados para: {filterType}, búsqueda: {searchTerm}</p>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li
                key={result.id}
                className="border p-2 rounded-md shadow cursor-pointer"
                onClick={() => handleDataClick(result)}
              >
                {filterType === 'usuarios' ? `${result.nombres} ${result.apellidos}` : result.nombre}
              </li>
            ))}
          </ul>
        </div>

        {/* Renderiza el formulario correspondiente */}
        <div className="col-span-1">
          {filterType === 'usuarios' && <FormUser />}
          {filterType === 'clases' && <FormClases />}
          {filterType === 'torneos' && <FormTorneo />}
          {filterType === 'canchas' && <FormCanchas />}
        </div>
      </div>

      {/* Modal para mostrar detalles */}
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedData} />
    </div>
  );
};

export default Agregar;
