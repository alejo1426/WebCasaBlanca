import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Asegúrate de haber configurado supabaseClient.js
import bcrypt from 'bcryptjs';

const SignUp = () => {
    const navigate = useNavigate();

    // Crear estados para cada campo del formulario
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [edad, setEdad] = useState('');
    const [tipo] = useState('usuario');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        if (parseInt(edad) < 18) {
            alert('Debes tener al menos 18 años para registrarte.');
            return;
        }

        const { data: existingUser, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .or(`correo.eq.${correo},usuario.eq.${usuario}`)
        .single(); // Obtener un solo registro que coincida

        if (userError && userError.code !== 'PGRST116') { // PGRST116: No se encontraron registros
            console.error('Error al verificar usuario/correo:', userError);
            alert('Hubo un error al verificar los datos. Inténtalo de nuevo más tarde.');
            return;
        }

        if (existingUser) {
            if (existingUser.correo === correo) {
                alert('El correo ya está registrado. Por favor, usa otro.');
            } else if (existingUser.usuario === usuario) {
                alert('El usuario ya existe. Por favor, elige otro.');
            }
            return;
        }
        // Hashear la contra
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar los datos en Supabase
        const { data, error } = await supabase
            .from('usuarios') // El nombre de tu tabla en Supabase
            .insert([
                {
                    nombres,
                    apellidos,
                    cedula,
                    correo,
                    usuario,
                    password: hashedPassword,  // Cambiado a 'password' para que coincida con la tabla
                    telefono,
                    direccion,
                    edad: parseInt(edad),
                    tipo 
                }
            ]);

        if (error) {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un error en el registro. Verifica que el correo y usuario no estén registrados.');
        } else {
            console.log('Usuario registrado:', data);
            alert('¡Registro exitoso!');
            navigate('/Login');
        }
    };

    return (
        <div className="flex flex-col w-full max-w-lg mx-auto p-30 md:p-20 2xl:p-30 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-col justify-center items-center gap-4 pb-4">
                <div>
                    <img src="/src/assets/logo.jpeg" width="200" alt="Logo" />
                </div>
                <h1 className="text-4xl font-bold text-[#006aff]">CASA BLANCA</h1>
            </div>
            <div className="text-sm font-light text-[#6B7280] pb-8 text-center">Regístrate con nosotros y disfruta!!</div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="pb-2">
                    <label htmlFor="nombres" className="block mb-2 text-sm font-medium text-[#111827]">Nombres</label>
                    <input
                        type="text"
                        name="nombres"
                        id="nombres"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese sus nombres"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="apellidos" className="block mb-2 text-sm font-medium text-[#111827]">Apellidos</label>
                    <input
                        type="text"
                        name="apellidos"
                        id="apellidos"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese sus apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="cedula" className="block mb-2 text-sm font-medium text-[#111827]">Cédula</label>
                    <input
                        type="text"
                        name="cedula"
                        id="cedula"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese su cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="correo" className="block mb-2 text-sm font-medium text-[#111827]">Correo</label>
                    <input
                        type="email"
                        name="correo"
                        id="correo"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese su correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-[#111827]">Usuario</label>
                    <input
                        type="text"
                        name="usuario"
                        id="usuario"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese su usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-[#111827]">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese su teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-[#111827]">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese su dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="pb-2">
                    <label htmlFor="edad" className="block mb-2 text-sm font-medium text-[#111827]">Edad</label>
                    <input
                        type="number"
                        name="edad"
                        id="edad"
                        className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                        placeholder="Ingrese su edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Registrarse</button>
                <div className="text-sm font-light text-[#6B7280]">
                    ¿Ya estás vinculado con nosotros? <span className="font-medium text-[#4F46E5] hover:underline cursor-pointer" onClick={() => navigate('/Login')}>Iniciar Sesión</span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
