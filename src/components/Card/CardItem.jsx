/* eslint-disable react/prop-types */
const CardItem = ({ item, type, onSelect }) => {
  // Formatear las fechas con la zona horaria 'UTC'
  const formatDate = (date) => date 
    ? new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC' }) 
    : 'No disponible';

  return (
    <div
      className="bg-gray-300 p-6 rounded-lg transition-shadow cursor-pointer"
      style={{ 
        boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)', // Sombra azul personalizada
        transition: 'box-shadow 0.3s ease-in-out' 
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)'} // Sombra más azul al pasar el cursor
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)'} // Vuelve a la sombra original
      onClick={() => onSelect(item)}
    >
      <h2 className="font-bold text-xl mb-2 text-gray-800">{item.nombre}</h2>
      {type === 'class' ? (
        <>
          <p className="text-gray-600">Profesor: {item.usuarios ? `${item.usuarios.nombres} ${item.usuarios.apellidos}` : 'Sin asignar'}</p>
          <p className="text-gray-600">Horario: <span className="font-semibold">{item.horario}</span></p>
          <p className="text-gray-600">Nivel: <span className="font-semibold">{item.nivel}</span></p>
        </>
      ) : type === 'tournament' ? (
        <>
          <p className="text-gray-600">Fecha de Inicio: <span className="font-semibold">{formatDate(item.fecha_inicio)}</span></p>
          <p className="text-gray-600">Fecha de Fin: <span className="font-semibold">{formatDate(item.fecha_fin)}</span></p>
          <p className="text-gray-600">Categoría: <span className="font-semibold">{item.categoria}</span></p>
        </>
      ) : null}
    </div>
  );
};

export default CardItem;
