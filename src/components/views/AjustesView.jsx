/* eslint-disable react/prop-types */
import Agregar from './Submenus/Agregar';
import Modificar from './Submenus/Modificar';
import Eliminar from './Submenus/Eliminar';

const AjustesView = ({ selectedItem }) => {
  const renderSubmenu = () => {
    switch (selectedItem) {
      case 'agregar':
        return <Agregar />;
      case 'modificar':
        return <Modificar />;
      case 'eliminar':
        return <Eliminar />;
      default:
        return <Agregar />;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Vista de Ajustes</h1>
      {/* Aquí se renderiza dinámicamente el submenú seleccionado */}
      {renderSubmenu()}
    </div>
  );
};

export default AjustesView;
