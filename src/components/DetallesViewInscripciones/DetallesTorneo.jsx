import React from 'react';

const DetallesTorneo = ({ torneo, onDelete }) => {
  const formatDate = (date) => 
    date ? new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'No disponible';

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-2xl mb-2 text-gray-800">{torneo.nombre}</h2>
      <p className="text-gray-600"><strong>Descripción:</strong> {torneo.descripcion}</p>
      <p className="text-gray-600"><strong>Fecha de Inicio:</strong> <span className="font-semibold">{formatDate(torneo.fecha_inicio)}</span></p>
      <p className="text-gray-600"><strong>Fecha de Fin:</strong> <span className="font-semibold">{formatDate(torneo.fecha_fin)}</span></p>
      <p className="text-gray-600"><strong>Ubicación:</strong> <span className="font-semibold">{torneo.ubicacion}</span></p>
      <p className="text-gray-600"><strong>Categoría:</strong> <span className="font-semibold">{torneo.categoria}</span></p>
      <p className="text-gray-600"><strong>Premios:</strong> <span className="font-semibold">{torneo.premios}</span></p>
      <p className="text-gray-600"><strong>Cupo Máximo:</strong> <span className="font-semibold">{torneo.cupo_maximo}</span></p>
      <p className="text-gray-600"><strong>Fecha de Inscripción:</strong> <span className="font-semibold">{formatDate(torneo.fecha_inscripcion)}</span></p>
      <button 
        onClick={onDelete} 
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Eliminar Inscripción
      </button>
    </div>
  );
};

export default DetallesTorneo;
