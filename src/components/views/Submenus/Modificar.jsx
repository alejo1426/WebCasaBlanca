const Modificar = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold">Modificar Elemento</h2>
        {/* Aquí iría la lógica para seleccionar y modificar algo */}
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Seleccionar Elemento a Modificar</label>
            <select className="mt-1 block w-full border-gray-300 rounded-md">
              <option value="1">Elemento 1</option>
              <option value="2">Elemento 2</option>
              {/* Agregar más opciones aquí */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nuevo Nombre</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Modificar
          </button>
        </form>
      </div>
    );
  };
  
  export default Modificar;
  