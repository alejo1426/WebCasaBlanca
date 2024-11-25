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

    if (table === 'torneos') {
      // Incluyendo la cancha asociada a cada torneo
      query = query.select(`
        *,
        torneoscanchas (
          cancha_id,
          canchas (
            id,
            nombre
          )
        )
      `);
    } else if (table === 'clases') {
      // Incluyendo la cancha asociada a cada clase
      query = query.select(`
        *,
        clasescanchas (
          cancha_id,
          canchas (
            id,
            nombre
          )
        )
      `);
    }

    if (search) {
      query = query.ilike('nombre', `%${search}%`);
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
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul
            className="mt-4 space-y-2 overflow-y-auto" 
            style={{ maxHeight: '400px' }}
          >
            {results.map((result) => (
              <li
                key={result.id}
                className={`border-black p-2 rounded-md border font-semibold text-center shadow cursor-pointer transition-transform duration-300 
                            ${selectedItem?.id === result.id ? 'bg-gray-200' : 'hover:scale-105 hover:bg-gray-300'}`}
                onClick={() => handleItemClick(result)}
              >
                {filterType === 'usuarios' ? result.usuario : result.nombre}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <div className="shadow-lg shadow-blue-500 p-4 bg-gray-200 rounded-md transition-transform duration-300 hover:shadow-blue-700 hover:scale-105">
          <h4 className="text-lg text-center font-semibold">Agregar {filterType}</h4>
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
