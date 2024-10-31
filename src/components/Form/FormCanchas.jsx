/* eslint-disable react/prop-types */
import { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormCanchas = ({ onCanchaAdded }) => {
  const [canchaData, setCanchaData] = useState({
    nombre: '',
    capacidad: '',
  });

  const handleChange = (e) => {
    setCanchaData({ ...canchaData, [e.target.name]: e.target.value });
  };

  const validateCapacidad = (capacidad) => {
    const capacidadNumber = parseInt(capacidad, 10);
    return capacidadNumber > 0;
  };

  const checkCanchaExists = async () => {
    const { data, error } = await supabase
      .from('canchas')
      .select('*')
      .eq('nombre', canchaData.nombre);

    if (error) {
      console.error('Error checking existing canchas:', error);
    }

    return data.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!canchaData.nombre || !canchaData.capacidad) {
      toast.error('Todos los campos deben estar llenos.');
      return;
    }

    // Validar que la capacidad sea un número válido
    if (!validateCapacidad(canchaData.capacidad)) {
      toast.error('La capacidad debe ser un número positivo.');
      return;
    }

    // Verificar si ya existe una cancha con el mismo nombre
    const canchaExists = await checkCanchaExists();
    if (canchaExists) {
      toast.error('Ya existe una cancha con este nombre.');
      return;
    }

    // Insertar nueva cancha
    const { error } = await supabase
      .from('canchas')
      .insert([canchaData]);

    if (error) {
      console.error('Error al agregar la cancha:', error);
      toast.error('Error al agregar la cancha.');
    } else {
      toast.success('Cancha añadida con éxito.');

      // Llamar a la función para recargar los datos
      if (onCanchaAdded) {
        onCanchaAdded();
      }

      // Limpiar el formulario después de un envío exitoso
      setCanchaData({
        nombre: '',
        capacidad: '',
      });
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Agregar Cancha</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la Cancha</label>
          <input
            type="text"
            name="nombre"
            value={canchaData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={canchaData.capacidad}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Agregar Cancha
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormCanchas;
