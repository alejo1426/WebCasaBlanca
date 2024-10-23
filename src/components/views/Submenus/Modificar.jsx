import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import FormClases from '../../Form/FormClases'; // Asegúrate de tener este formulario
import FormUser from '../../Form/FormUser'; // Asegúrate de tener este formulario
import FormTorneo from '../../Form/FormTorneos'; // Asegúrate de tener este formulario
import FormCanchas from '../../Form/FormCanchas'; // Asegúrate de tener este formulario
import Modal from '../../Ventana/Modal';

const Modificar = () => {
  const [filterType, setFilterType] = useState('clases'); // Tipo de filtro inicial
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
            : `nombre.ilike.%${search}%`
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
  };

  const handleModify = async (event) => {
    event.preventDefault();

    if (!selectedData) {
      return;
    }

    // Aquí puedes agregar la lógica para modificar el elemento
    const { error } = await supabase
      .from(filterType)
      .update({ nombre: selectedData.nombre }) // Cambia este campo según sea necesario
      .eq('id', selectedData.id);

    if (error) {
      console.error('Error modifying data:', error);
    } else {
      alert('Elemento modificado con éxito');
      // Puedes realizar una nueva búsqueda o limpiar el estado si es necesario
      setSearchTerm('');
      setSelectedData(null);
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Modificar Elemento</h2>

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

        <div className="col-span-1">
          {selectedData && (
            <form className="mt-4" onSubmit={handleModify}>
              <h4 className="text-lg font-semibold">Modificar {filterType}</h4>

              {filterType === 'clases' && (
                <FormClases initialData={selectedData} setSelectedData={setSelectedData} />
              )}
              {filterType === 'usuarios' && (
                <FormUser initialData={selectedData} setSelectedData={setSelectedData} />
              )}
              {filterType === 'torneos' && (
                <FormTorneo initialData={selectedData} setSelectedData={setSelectedData} />
              )}
              {filterType === 'canchas' && (
                <FormCanchas initialData={selectedData} setSelectedData={setSelectedData} />
              )}

              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Modificar
              </button>
            </form>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedData} />
    </div>
  );
};

export default Modificar;
