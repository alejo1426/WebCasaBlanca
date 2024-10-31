/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-105 z-60">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Detalles</h2>
        {data && (
          <div>
            {data.nombres && <p className="text-gray-800"><strong>Nombres:</strong> {data.nombres}</p>}
            {data.apellidos && <p className="text-gray-800"><strong>Apellidos:</strong> {data.apellidos}</p>}
            {data.nombre && <p className="text-gray-800"><strong>Nombre:</strong> {data.nombre}</p>}
            {data.descripcion && <p className="text-gray-800"><strong>Descripción:</strong> {data.descripcion}</p>}
            {data.horario && <p className="text-gray-800"><strong>Horario:</strong> {data.horario}</p>}
            {data.nivel && <p className="text-gray-800"><strong>Nivel:</strong> {data.nivel}</p>}
            {data.instructor_nombre && data.instructor_apellido && (
              <p className="text-gray-800"><strong>Instructor:</strong> {`${data.instructor_nombre} ${data.instructor_apellido}`}</p>
            )}
            {data.fecha_inicio && <p className="text-gray-800"><strong>Fecha de inicio:</strong> {data.fecha_inicio}</p>}
            {data.fecha_fin && <p className="text-gray-800"><strong>Fecha de fin:</strong> {data.fecha_fin}</p>}
            {data.ubicacion && <p className="text-gray-800"><strong>Ubicación:</strong> {data.ubicacion}</p>}
            {data.categoria && <p className="text-gray-800"><strong>Categoría:</strong> {data.categoria}</p>}
            {data.premios && <p className="text-gray-800"><strong>Premios:</strong> {data.premios}</p>}
            {data.cupo_maximo && <p className="text-gray-800"><strong>Cupo máximo:</strong> {data.cupo_maximo}</p>}
            {data.telefono && <p className="text-gray-800"><strong>Teléfono:</strong> {data.telefono}</p>}
            {data.direccion && <p className="text-gray-800"><strong>Dirección:</strong> {data.direccion}</p>}
            {data.edad && <p className="text-gray-800"><strong>Edad:</strong> {data.edad}</p>}
            {data.rol && <p className="text-gray-800"><strong>Rol:</strong> {data.rol}</p>}
            {data.nivel_aprendizaje && <p className="text-gray-800"><strong>Nivel de aprendizaje:</strong> {data.nivel_aprendizaje}</p>}
            {/* Agrega más campos según sea necesario */}
          </div>
        )}
        <button 
          onClick={onClose} 
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-6 py-2 transition duration-300 transform hover:scale-105"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
