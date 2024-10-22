import { useState } from 'react';
import { supabase } from '../../../supabaseClient'; // Asegúrate de que la ruta sea correcta

const FormCanchas = () => {
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Validar los campos
    if (!nombre || !capacidad) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Agregar el registro a la tabla Canchas
    const { data, error } = await supabase
      .from('canchas')
      .insert([{ nombre, capacidad }]);

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      // Limpiar los campos después de un envío exitoso
      setNombre('');
      setCapacidad('');
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Agregar Cancha</h3>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Canchas añadida exitosamente!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la Cancha</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Capacidad</label>
          <input
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Agregar Cancha
        </button>
      </form>
    </div>
  );
};

export default FormCanchas;
