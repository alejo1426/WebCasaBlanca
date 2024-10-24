import React from 'react';

const DetallesTorneo = ({ torneo, onDelete }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg">{torneo.nombre}</h2>
      <p><strong>Descripción:</strong> {torneo.descripcion}</p>
      <p><strong>Fecha de Inicio:</strong> {new Date(torneo.fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
      <p><strong>Fecha de Fin:</strong> {new Date(torneo.fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
      <p><strong>Ubicación:</strong> {torneo.ubicacion}</p>
      <p><strong>Categoría:</strong> {torneo.categoria}</p>
      <p><strong>Premios:</strong> {torneo.premios}</p>
      <p><strong>Cupo Máximo:</strong> {torneo.cupo_maximo}</p>
      <p><strong>Fecha de Inscripción:</strong> {new Date(torneo.fecha_inscripcion).toLocaleDateString('es-ES')}</p>
      <button 
        onClick={onDelete} 
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Eliminar Inscripción
      </button>
    </div>
  );
};

export default DetallesTorneo;
