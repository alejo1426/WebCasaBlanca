/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
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

  // Referencia para la sección de detalles
  const detallesRef = useRef(null);

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

  // Función para obtener el nombre del instructor
  const fetchInstructorName = async (id) => {
    if (!id) {
      return 'N/A'; // Si no hay id de instructor, retornar 'N/A'
    }

    try {
      const { data, error } = await supabase
        .from('usuarios') // Buscamos en la tabla 'usuarios', no en 'torneos'
        .select('nombres, apellidos')
        .eq('id', id); // Comparamos con el id del instructor

      if (error) {
        console.error('Error fetching instructor name:', error.message);
        return 'N/A'; // Si hay error, retornamos 'N/A'
      }

      // Verificar si la consulta devolvió datos
      if (data && data.length > 0) {
        const instructor = data[0]; // Tomamos solo el primer resultado
        return `${instructor.nombres} ${instructor.apellidos}`;
      }

      return 'N/A'; // Si no se encuentra, retornamos 'N/A'
    } catch (err) {
      console.error('Error fetching instructor name:', err);
      return 'N/A'; // Si hay error, retornamos 'N/A'
    }
  };

  const deleteItem = async (id) => {
    const { error } = await supabase.from(filterType).delete().eq('id', id);
    if (error) {
      console.error('Error deleting item:', error);
    } else {
      setResults(results.filter((item) => item.id !== id));
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
    let instructorNombre = null;

    if (filterType === 'clases') {
      instructorNombre = await fetchInstructorName(item.instructor_id, 'clases');
    } else if (filterType === 'torneos') {
      instructorNombre = await fetchInstructorName(item.instructor_id, 'torneos');
    }

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

  // Desplazarse automáticamente a la sección de detalles al seleccionar un ítem
  useEffect(() => {
    if (selectedItem && detallesRef.current) {
      detallesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedItem]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Eliminar {filterType}</h2>

      <BarraFiltro onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul
            className="mt-4 space-y-2 overflow-y-auto" // Habilita el scroll vertical
            style={{ maxHeight: '400px' }}
          >
            {results.map((result) => (
              <li
                key={result.id}
                className={`border border-black font-semibold text-center p-2 rounded-md cursor-pointer transition-transform duration-300 
                            ${selectedItem?.id === result.id ? 'bg-gray-200' : 'hover:bg-gray-200 hover:scale-105'}`}
                onClick={() => handleItemClick(result)}
              >
                {filterType === 'usuarios' ? `${result.nombres} ${result.apellidos}` : result.nombre}
              </li>
            ))}
          </ul>
        </div>

        {/* Información detallada del elemento seleccionado */}
        <div ref={detallesRef} className="col-span-1">
          {selectedItem && (
            <div className="shadow-lg shadow-blue-500 p-4 rounded-md transition-transform duration-300 hover:shadow-blue-700 hover:scale-105">
              <h4 className="text-lg text-center font-semibold text-[#1d3557] mb-2">Detalles</h4>
              <div>
                {filterType === 'clases' && (
                  <>
                    <p><strong>Nombre:</strong> {selectedItem.nombre}</p>
                    <p><strong>Descripción:</strong> {selectedItem.descripcion}</p>
                    <p><strong>Horario:</strong> {selectedItem.horario}</p>
                    <p><strong>Nivel:</strong> {selectedItem.nivel}</p>
                    <p><strong>Instructor:</strong> {selectedItem.instructorNombre || 'Cargando...'}</p>
                    <p><strong>Fecha de Inicio:</strong> {selectedItem.fecha_inicio}</p>
                    <p><strong>Fecha de Fin:</strong> {selectedItem.fecha_fin || 'N/A'}</p>
                    <p><strong>Precio:</strong> COP {selectedItem.precio_clase ? selectedItem.precio_clase.toLocaleString('es-CO') : 'N/A'}</p>
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
                    <p><strong>Horario:</strong> {selectedItem.horario || 'N/A'}</p>
                    <p><strong>Precio:</strong> COP {selectedItem.precio_torneo ? selectedItem.precio_torneo.toLocaleString('es-CO') : 'N/A'}</p>
                    <p><strong>Instructor:</strong> {selectedItem.instructorNombre || 'Cargando...'}</p>
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
                    <p><strong>Fecha de Registro:</strong> {selectedItem.fecha_registro}</p>
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
                className="bg-red-500 text-white p-2 rounded-md mt-4 w-full hover:bg-red-600"
                onClick={handleDeleteClick}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      <ModalConfirmacion 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
        tipo={filterType} 
      />

      {/* Toast de notificación */}
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
      />
    </div>
  );
};

export default Eliminar;
