import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import FormUser from '../../Form/FormUser';
import FormClases from '../../Form/FormClases';
import FormTorneo from '../../Form/FormTorneos';
import FormCanchas from '../../Form/FormCanchas';
import Modal from '../../Ventana/Modal';

const Agregar = () => {
  const [filterType, setFilterType] = useState('clases');
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (table, search = '') => {
    let query = supabase.from(table).select('*');

    if (search) {
      query = query.ilike('nombre', `%${search}%`); // Ajusta esto según la estructura de tu base de datos
    }

    const { data, error } = await query;
    if (error) {
      console.error(`Error fetching ${table}:`, error);
    } else {
      setResults(data);
    }
  };

  useEffect(() => {
    fetchData(filterType, searchTerm);
  }, [filterType, searchTerm]);

  const handleFilterChange = (selectedFilter) => {
    setFilterType(selectedFilter);
    fetchData(selectedFilter, searchTerm);
  };

  const handleDataAdded = () => {
    fetchData(filterType, searchTerm);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const formComponents = {
    clases: <FormClases onClassAdded={handleDataAdded} />,
    torneos: <FormTorneo onTournamentAdded={handleDataAdded} />,
    usuarios: <FormUser onUserAdded={handleDataAdded} />,
    canchas: <FormCanchas onCanchaAdded={handleDataAdded} />
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Agregar {filterType}</h2>

      <BarraFiltro 
        onFilterChange={handleFilterChange} 
        onSearchChange={setSearchTerm} 
        showSearch={true} 
      />

      <div className="grid grid-cols-1 rounded-lg md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1 bg-gray-100">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li
                key={result.id}
                className={`border p-2 rounded-md shadow cursor-pointer transition-transform duration-300 
                            ${selectedItem?.id === result.id ? 'bg-gray-200' : 'hover:scale-105 hover:bg-gray-300'}`}
                onClick={() => handleItemClick(result)}
              >
                {filterType === 'usuarios' ? result.usuario : result.nombre}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <div className="shadow-lg shadow-blue-500 p-4 rounded-md transition-transform duration-300 hover:shadow-blue-700 hover:scale-105">
            {formComponents[filterType]}
          </div>
        </div>
      </div>

      {selectedItem && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedItem} />
      )}
    </div>
  );
};

export default Agregar;
