/* eslint-disable react/prop-types */
const DetallesTorneo = ({ torneo, enrolledUsers }) => {
  const formatDate = (date) => 
    date ? new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'No disponible';

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-2xl mb-2 text-gray-800">{torneo.nombre}</h2>
      <p className="text-gray-600"><strong>Descripción:</strong> {torneo.descripcion}</p>
      <p className="text-gray-600"><strong>Fecha de Inicio:</strong> <span className="font-semibold">{formatDate(torneo.fecha_inicio)}</span></p>
      <p className="text-gray-600"><strong>Fecha de Fin:</strong> <span className="font-semibold">{formatDate(torneo.fecha_fin)}</span></p>
      <p className="text-gray-600"><strong>Ubicación:</strong> <span className="font-semibold">{torneo.ubicacion}</span></p>
      <p className="text-gray-600"><strong>Categoría:</strong> <span className="font-semibold">{torneo.categoria}</span></p>
      <p className="text-gray-600"><strong>Premios:</strong> <span className="font-semibold">{torneo.premios}</span></p>
      <p className="text-gray-600"><strong>Cupo Máximo:</strong> <span className="font-semibold">{torneo.cupo_maximo}</span></p>
      
      {/* Sección para mostrar los usuarios inscritos */}
      <h3 className="text-lg font-semibold mt-4">Usuarios Inscritos:</h3>
      {enrolledUsers && enrolledUsers.length > 0 ? (
        <ul className="list-disc pl-5">
          {enrolledUsers.map(user => (
            <li key={user.id}>{user.nombres} {user.apellidos}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios inscritos.</p>
      )}
    </div>
  );
};

export default DetallesTorneo;
