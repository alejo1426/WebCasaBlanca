import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import ModalConfirmacion from '../../Ventana/ModalConfirmacion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Eliminar = () => {
  const [filterType, setFilterType] = useState('clases');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchResults = async () => {
    let query = supabase.from(filterType).select('*');

    if (searchTerm) {
      if (filterType === 'usuarios') {
        query = query.or(`nombres.ilike.%${searchTerm}%,apellidos.ilike.%${searchTerm}%`);
      } else {
        query = query.or(`nombre.ilike.%${searchTerm}%`);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error(`Error fetching ${filterType}:`, error);
    } else {
      setResults(data);
    }
  };

  const fetchInstructorName = async (id) => {
    const { data, error } = await supabase
      .from('clases')
      .select('usuarios!clases_instructor_id_fkey(nombres, apellidos)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching instructor name:', error);
      return null;
    }
    
    return `${data.usuarios.nombres} ${data.usuarios.apellidos}`;
  };

  const deleteItem = async (id) => {
    const { error } = await supabase.from(filterType).delete().eq('id', id);
    if (error) {
      console.error('Error deleting item:', error);
    } else {
      setResults(results.filter(item => item.id !== id));
      setSelectedItem(null);
      toast.success('Elemento eliminado correctamente');
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchResults();
  }, [filterType, searchTerm]);

  const handleFilterChange = (selectedFilter) => {
    setFilterType(selectedFilter);
    setSelectedItem(null);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleItemClick = async (item) => {
    const instructorNombre = filterType === 'clases' ? await fetchInstructorName(item.id) : null;
    setSelectedItem({ ...item, instructorNombre });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteItem(selectedItem.id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Eliminar {filterType}</h2>

      <BarraFiltro onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li 
                key={result.id} 
                className={`border p-2 rounded-md cursor-pointer transition-transform duration-300 
                            ${selectedItem?.id === result.id ? 'bg-gray-200' : 'hover:bg-gray-200 hover:scale-105'}`}
                onClick={() => handleItemClick(result)}
              >
                {filterType === 'usuarios' ? `${result.nombres} ${result.apellidos}` : result.nombre}
              </li>
            ))}
          </ul>
        </div>

        {/* Información detallada del elemento seleccionado */}
        <div className="col-span-1">
          {selectedItem && (
            <div className="shadow-lg shadow-blue-500 p-4 rounded-md transition-transform duration-300 hover:shadow-blue-700 hover:scale-105">
              <h4 className="text-lg font-semibold mb-2">Detalles</h4>
              <div>
                {filterType === 'clases' && (
                  <>
                    <p><strong>Nombre:</strong> {selectedItem.nombre}</p>
                    <p><strong>Descripción:</strong> {selectedItem.descripcion}</p>
                    <p><strong>Horario:</strong> {selectedItem.horario}</p>
                    <p><strong>Nivel:</strong> {selectedItem.nivel}</p>
                    <p><strong>Instructor:</strong> {selectedItem.instructorNombre}</p>
                    <p><strong>Fecha de Inicio:</strong> {selectedItem.fecha_inicio}</p>
                    <p><strong>Fecha de Fin:</strong> {selectedItem.fecha_fin || 'N/A'}</p>
                  </>
                )}
                {filterType === 'torneos' && (
                  <>
                    <p><strong>Nombre:</strong> {selectedItem.nombre}</p>
                    <p><strong>Descripción:</strong> {selectedItem.descripcion}</p>
                    <p><strong>Fecha de Inicio:</strong> {selectedItem.fecha_inicio}</p>
                    <p><strong>Fecha de Fin:</strong> {selectedItem.fecha_fin}</p>
                    <p><strong>Ubicación:</strong> {selectedItem.ubicacion}</p>
                    <p><strong>Categoría:</strong> {selectedItem.categoria}</p>
                    <p><strong>Estado:</strong> {selectedItem.estado}</p>
                    <p><strong>Premios:</strong> {selectedItem.premios || 'N/A'}</p>
                    <p><strong>Cupo Máximo:</strong> {selectedItem.cupo_maximo}</p>
                  </>
                )}
                {filterType === 'usuarios' && (
                  <>
                    <p><strong>Nombres:</strong> {selectedItem.nombres}</p>
                    <p><strong>Apellidos:</strong> {selectedItem.apellidos}</p>
                    <p><strong>Correo:</strong> {selectedItem.correo}</p>
                    <p><strong>Usuario:</strong> {selectedItem.usuario}</p>
                    <p><strong>Teléfono:</strong> {selectedItem.telefono || 'N/A'}</p>
                    <p><strong>Dirección:</strong> {selectedItem.direccion || 'N/A'}</p>
                    <p><strong>Edad:</strong> {selectedItem.edad || 'N/A'}</p>
                    <p><strong>Rol:</strong> {selectedItem.rol}</p>
                    <p><strong>Nivel de Aprendizaje:</strong> {selectedItem.nivel_aprendizaje || 'N/A'}</p>
                    <p><strong>Fecha de Registro:</strong> {new Date(selectedItem.fecha_registro).toLocaleString()}</p>
                  </>
                )}
                {filterType === 'canchas' && (
                  <>
                    <p><strong>Nombre:</strong> {selectedItem.nombre}</p>
                    <p><strong>Capacidad:</strong> {selectedItem.capacidad}</p>
                  </>
                )}
              </div>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleDeleteClick}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <ModalConfirmacion 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
        tipo={filterType} 
      />

      <ToastContainer />
    </div>
  );
};

export default Eliminar;
