import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUpdateCanchas = ({ initialData, onUpdate }) => {
  const [canchaData, setCanchaData] = useState({
    nombre: '',
    capacidad: '',
  });

  // Cargar datos iniciales si se proporcionan
  useEffect(() => {
    if (initialData) {
      setCanchaData(initialData);
    }
  }, [initialData]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setCanchaData({ ...canchaData, [e.target.name]: e.target.value });
  };

  // Validar que todos los campos estén llenos
  const validateForm = () => {
    if (Object.values(canchaData).some((value) => value === '')) {
      toast.error('Todos los campos deben estar llenos.');
      return false;
    }
    return true;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!validateForm()) return;

    try {
      const { error } = await supabase
        .from('canchas')
        .update({
          nombre: canchaData.nombre,
          capacidad: canchaData.capacidad,
        })
        .eq('id', initialData.id); // Suponiendo que el ID de la cancha está en initialData

      // Verificar si hubo un error
      if (error) {
        console.error('Error al modificar la cancha:', error);
        toast.error('Error al modificar la cancha'); // Mostrar error
      } else {
        toast.success('Cancha modificada con éxito'); // Mostrar éxito
        onUpdate(); // Llamamos a onUpdate para actualizar la lista de resultados
      }
    } catch (error) {
      console.error('Error al modificar la cancha:', error);
      toast.error('Error al modificar la cancha'); // Mostrar error
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        {/* Nombre de la cancha */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={canchaData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Capacidad */}
        <div className="mb-4">
          <label className="block text-gray-700">Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={canchaData.capacidad}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Modificar Cancha
        </button>
      </form>

      <ToastContainer /> {/* Agregar el ToastContainer aquí */}
    </>
  );
};

export default FormUpdateCanchas;
