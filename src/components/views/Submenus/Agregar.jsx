const Agregar = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold">Agregar Elemento</h2>
        {/* Aquí iría el formulario o la lógica para agregar algo */}
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Elemento</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Agregar
          </button>
        </form>
      </div>
    );
  };
  
  export default Agregar;
  