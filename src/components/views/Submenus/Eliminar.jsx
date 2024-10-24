import { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import BarraFiltro from '../../SearchBar/SearchBar';
import ModalConfirmacion from '../../Ventana/ModalConfirmacion'; // Importar el modal
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Eliminar = () => {
  const [filterType, setFilterType] = useState('clases');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones para recuperar datos
  const fetchClasses = async () => {
    const { data, error } = await supabase.from('clases').select('*');
    if (error) {
      console.error('Error fetching classes:', error);
    } else {
      setResults(data);
    }
  };

  const fetchTournaments = async () => {
    const { data, error } = await supabase.from('torneos').select('*');
    if (error) {
      console.error('Error fetching tournaments:', error);
    } else {
      setResults(data);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setResults(data);
    }
  };

  const fetchCanchas = async () => {
    const { data, error } = await supabase.from('canchas').select('*');
    if (error) {
      console.error('Error fetching canchas:', error);
    } else {
      setResults(data);
    }
  };

  // Función de eliminación
  const deleteItem = async (id) => {
    const { error } = await supabase.from(filterType).delete().eq('id', id);
    if (error) {
      console.error('Error deleting item:', error);
    } else {
      setResults(results.filter(item => item.id !== id)); // Actualiza la lista de resultados
      setSelectedItem(null); // Reinicia el elemento seleccionado
      toast.success('Elemento eliminado correctamente'); // Muestra el toast de éxito
    }
    setIsModalOpen(false); // Cierra el modal de confirmación
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
    setSelectedItem(null); // Reinicia la selección al cambiar de filtro
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Abre el modal de confirmación
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Eliminar {filterType}</h2>

      <BarraFiltro onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">Resultados</h3>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li 
                key={result.id} 
                className="border p-2 rounded-md shadow cursor-pointer"
                onClick={() => handleItemClick(result)} // Seleccionar elemento al hacer clic
              >
                {filterType === 'clases' ? result.nombre :
                 filterType === 'torneos' ? result.nombre :
                 filterType === 'usuarios' ? result.nombres :
                 result.nombre // Mostrar nombre para canchas
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Información detallada del elemento seleccionado */}
        <div className="col-span-1">
          {selectedItem && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Detalles</h4>
              <div>
                {filterType === 'clases' && (
                  <>
                    <p><strong>Nombre:</strong> {selectedItem.nombre}</p>
                    <p><strong>Descripción:</strong> {selectedItem.descripcion}</p>
                    <p><strong>Horario:</strong> {selectedItem.horario}</p>
                    <p><strong>Nivel:</strong> {selectedItem.nivel}</p>
                    <p><strong>Instructor ID:</strong> {selectedItem.instructor_id}</p>
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

      {/* Modal de confirmación */}
      <ModalConfirmacion 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={{
          action: () => deleteItem(selectedItem.id), // Ejecuta la eliminación
          type: filterType // Tipo de elemento a eliminar
        }} 
      />

      {/* Contenedor para los toasts */}
      <ToastContainer />
    </div>
  );
};

export default Eliminar;
