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