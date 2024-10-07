const Eliminar = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold">Eliminar Elemento</h2>
        {/* Aquí iría la lógica para eliminar algo */}
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Seleccionar Elemento a Eliminar</label>
            <select className="mt-1 block w-full border-gray-300 rounded-md">
              <option value="1">Elemento 1</option>
              <option value="2">Elemento 2</option>
              {/* Agregar más opciones aquí */}
            </select>
          </div>
          <button type="submit" className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
            Eliminar
          </button>
        </form>
      </div>
    );
  };
  
  export default Eliminar;
  