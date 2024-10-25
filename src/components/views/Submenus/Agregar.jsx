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
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda

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
  }, [filterType, searchTerm]); // Ahora también depende de searchTerm

  const handleFilterChange = (selectedFilter) => {
    setFilterType(selectedFilter);
    fetchData(selectedFilter, searchTerm); // Llamar a fetchData con el nuevo filtro y término de búsqueda
  };

  const handleDataAdded = () => {
    fetchData(filterType, searchTerm); // Actualizar resultados después de agregar un elemento
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
        onSearchChange={setSearchTerm} // Pasar la función para actualizar el término de búsqueda
        showSearch={true} // Asegúrate de que la barra de búsqueda se muestre
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li
                key={result.id}
                className="border p-2 rounded-md shadow cursor-pointer"
                onClick={() => handleItemClick(result)}
              >
                {filterType === 'usuarios' ? result.usuario : result.nombre}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          {formComponents[filterType]}
        </div>
      </div>

      {/* Modal para mostrar detalles del elemento seleccionado */}
      {selectedItem && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedItem} />
      )}
    </div>
  );
};

export default Agregar;
