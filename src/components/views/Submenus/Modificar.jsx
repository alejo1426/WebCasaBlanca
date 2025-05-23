import { useState, useEffect, useRef } from 'react'; // Importar useRef
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import FormUpdateClases from '../../Form/FormUpdateClase';
import FormUpdateUser from '../../Form/FormUpdateUserViewModificar';
import FormUpdateTorneos from '../../Form/FormUpdateTorneo';
import FormUpdateCanchas from '../../Form/FormUpdateCanchas';

const Modificar = () => {
  const [filterType, setFilterType] = useState('clases');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Referencia al contenedor de detalles
  const detailsRef = useRef(null);

  const fetchResults = async (filter, search) => {
    setLoading(true);
    let query;

    try {
      switch (filter) {
        case 'clases':
          query = supabase.from('clases');
          break;
        case 'usuarios':
          query = supabase.from('usuarios');
          break;
        case 'torneos':
          query = supabase.from('torneos').select('id, nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, categoria, premios, precio_torneo, cupo_maximo, instructor_id');
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

        if (error) throw error;

        setResults(fetchedData);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
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
    setSelectedData(null); // Reinicia el dato seleccionado al cambiar la categoría
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleDataClick = (data) => {
    setSelectedData(data);
    
    // Desplazarse a la sección de detalles
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
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
          
          {loading ? (
            <p>Cargando resultados...</p>
          ) : (
            <ul 
              className="rounded-md mt-4 space-y-2 overflow-y-auto" // Habilita el scroll vertical
              style={{ maxHeight: '400px' }}
            >
              {results.map((result) => (
                <li
                  key={result.id}
                  className={`border font-semibold p-2 text-center bg-gray-100 border-black rounded-md shadow cursor-pointer transition-transform duration-300 
                              ${selectedData?.id === result.id ? 'bg-gray-200' : 'hover:scale-105 hover:bg-gray-200'}`}
                  onClick={() => handleDataClick(result)}
                >
                  {filterType === 'usuarios' ? `${result.nombres} ${result.apellidos}` : result.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-1" ref={detailsRef}> {/* Añadimos la referencia aquí */}
          {selectedData && (
            <div className="shadow-lg shadow-blue-500 p-4 bg-gray-200 rounded-md transition-transform duration-300 hover:shadow-blue-700 hover:scale-105">
              <h4 className="text-lg text-center font-semibold">Modificar {filterType}</h4>

              {filterType === 'clases' && (
                <FormUpdateClases
                  initialData={selectedData}
                  onUpdate={() => fetchResults(filterType, searchTerm)}
                />
              )}
              {filterType === 'usuarios' && (
                <FormUpdateUser
                  initialData={selectedData}
                  onUpdate={() => fetchResults(filterType, searchTerm)}
                />
              )}
              {filterType === 'torneos' && (
                <FormUpdateTorneos
                  initialData={selectedData}
                  onTournamentUpdated={() => fetchResults(filterType, searchTerm)}
                />
              )}
              {filterType === 'canchas' && (
                <FormUpdateCanchas
                  initialData={selectedData}
                  onUpdate={() => fetchResults(filterType, searchTerm)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modificar;
