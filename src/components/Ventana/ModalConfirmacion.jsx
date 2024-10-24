import React from 'react';

const ModalConfirmacion = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // No renderiza el modal si no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar este {onConfirm.type}?</p>
        <div className="flex justify-end mt-6">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            onClick={onConfirm.action} // Acción de confirmación
          >
            Eliminar
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
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
