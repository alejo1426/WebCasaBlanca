import { useState } from 'react';
import { supabase } from '../../../supabaseClient';

const FormTorneo = () => {
  const [tournamentData, setTournamentData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    ubicacion: '',
    categoria: 'principiante', // Valor por defecto
    premios: '',
    cupo_maximo: '',
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData({ ...tournamentData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del torneo a agregar:', tournamentData);
    
    const { error } = await supabase.from('torneos').insert([tournamentData]);
    if (error) {
      console.error('Error al agregar el torneo:', error);
    } else {
      console.log('Torneo agregado exitosamente');
      // Aquí puedes restablecer el formulario o manejar la respuesta según sea necesario
      setTournamentData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        ubicacion: '',
        categoria: 'principiante',
        premios: '',
        cupo_maximo: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
      {/* Nombre del torneo */}
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={tournamentData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={tournamentData.descripcion}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Fecha de inicio */}
      <div className="mb-4">
        <label className="block text-gray-700">Fecha de Inicio</label>
        <input
          type="date"
          name="fecha_inicio"
          value={tournamentData.fecha_inicio}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Fecha de fin */}
      <div className="mb-4">
        <label className="block text-gray-700">Fecha de Fin</label>
        <input
          type="date"
          name="fecha_fin"
          value={tournamentData.fecha_fin}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Ubicación */}
      <div className="mb-4">
        <label className="block text-gray-700">Ubicación</label>
        <input
          type="text"
          name="ubicacion"
          value={tournamentData.ubicacion}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Categoría */}
      <div className="mb-4">
        <label className="block text-gray-700">Categoría</label>
        <select
          name="categoria"
          value={tournamentData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>

      {/* Premios */}
      <div className="mb-4">
        <label className="block text-gray-700">Premios</label>
        <textarea
          name="premios"
          value={tournamentData.premios}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Cupo máximo */}
      <div className="mb-4">
        <label className="block text-gray-700">Cupo Máximo</label>
        <input
          type="number"
          name="cupo_maximo"
          value={tournamentData.cupo_maximo}
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
        Agregar Torneo
      </button>
    </form>
  );
};

export default FormTorneo;
