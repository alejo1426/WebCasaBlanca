import React from 'react';

const DetallesClase = ({ clase, onDelete }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg">{clase.nombre}</h2>
      <p><strong>Descripción:</strong> {clase.descripcion}</p>
      <p><strong>Horario:</strong> {clase.horario}</p>
      <p><strong>Nivel:</strong> {clase.nivel}</p>
      <p><strong>Instructor:</strong> {clase.usuarios.nombres} {clase.usuarios.apellidos}</p>
      <p><strong>Fecha de Inicio:</strong> {new Date(clase.fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
      <p><strong>Fecha de Fin:</strong> {new Date(clase.fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
      <p><strong>Fecha de Inscripción:</strong> {new Date(clase.fecha_inscripcion).toLocaleDateString('es-ES')}</p>
      <button 
        onClick={onDelete} 
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Eliminar Inscripción
      </button>
    </div>
  );
};

export default DetallesClase;
