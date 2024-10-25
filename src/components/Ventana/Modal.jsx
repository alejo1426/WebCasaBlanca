// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalles</h2>
        {data && (
          <div>
            {data.nombres && <p><strong>Nombres:</strong> {data.nombres}</p>}
            {data.apellidos && <p><strong>Apellidos:</strong> {data.apellidos}</p>}
            {data.nombre && <p><strong>Nombre:</strong> {data.nombre}</p>}
            {data.descripcion && <p><strong>Descripción:</strong> {data.descripcion}</p>}
            {data.horario && <p><strong>Horario:</strong> {data.horario}</p>}
            {data.nivel && <p><strong>Nivel:</strong> {data.nivel}</p>}
            {data.instructor_nombre && data.instructor_apellido && (
              <p><strong>Instructor:</strong> {`${data.instructor_nombre} ${data.instructor_apellido}`}</p>
            )}
            {data.fecha_inicio && <p><strong>Fecha de inicio:</strong> {data.fecha_inicio}</p>}
            {data.fecha_fin && <p><strong>Fecha de fin:</strong> {data.fecha_fin}</p>}
            {data.ubicacion && <p><strong>Ubicación:</strong> {data.ubicacion}</p>}
            {data.categoria && <p><strong>Categoría:</strong> {data.categoria}</p>}
            {data.premios && <p><strong>Premios:</strong> {data.premios}</p>}
            {data.cupo_maximo && <p><strong>Cupo máximo:</strong> {data.cupo_maximo}</p>}
            {data.telefono && <p><strong>Teléfono:</strong> {data.telefono}</p>}
            {data.direccion && <p><strong>Dirección:</strong> {data.direccion}</p>}
            {data.edad && <p><strong>Edad:</strong> {data.edad}</p>}
            {data.rol && <p><strong>Rol:</strong> {data.rol}</p>}
            {data.nivel_aprendizaje && <p><strong>Nivel de aprendizaje:</strong> {data.nivel_aprendizaje}</p>}
            {/* Agrega más campos según sea necesario */}
          </div>
        )}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
