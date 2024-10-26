import React from 'react';

const ModalConfirmacion = ({ isOpen, onClose, onConfirm, tipo }) => {
  if (!isOpen) return null; // No renderiza el modal si no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Confirmar Eliminación</h3>
        <p className="text-gray-600 text-center">¿Estás seguro de que deseas eliminar este {tipo}?</p>
        <div className="flex justify-center mt-8"> {/* Cambiado a justify-center */}
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200 ease-in-out mr-2"
            onClick={onConfirm} // Acción de confirmación
          >
            Eliminar
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-200 ease-in-out"
            onClick={onClose} // Cierra el modal
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
