import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

const Registro = () => {
    const navigate = useNavigate();

    // Crear los estados para cada campo del formulario
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [edad, setEdad] = useState('');
    const [error, setError] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombres || !apellidos || !correo || !usuario || !password || !telefono || !direccion || !edad) {
            setError('Por favor, llena todos los campos para poder registrarte.');
            return;
        }

        if (parseInt(edad) < 15) {
            setError('Debes tener al menos 15 años para registrarte.');
            return;
        }

        // Realiza la solicitud a tu API de registro
        const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombres,
                apellidos,
                correo,
                usuario,
                password,
                telefono,
                direccion,
                edad: parseInt(edad),
                rol: 'usuario',
                nivel_aprendizaje: 'principiante',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Manejo de errores según el código de estado
            setError(data.message || 'Hubo un error en el registro. Intenta nuevamente.');
        } else {
            console.log('Usuario registrado:', data);
            alert('¡Registro exitoso!');
            navigate('/Login');
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            {/* Video de fondo */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover -z-10"
            >
                <source src="/video/Signup.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Contenedor del formulario */}
            <div className="flex flex-col w-full max-w-lg mx-auto p-6 md:p-10 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10">
                <div className="flex flex-col justify-center items-center gap-4 pb-4">
                    <div>
                        <img src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Img/logo.jpeg" width="150" alt="Logo" />
                    </div>
                    <h1 className="neon-text-titulo text-4xl font-bold text-[#006aff]">CASA BLANCA</h1>
                </div>
                <div className="neon-text-subtitulo text-sm font-bold text-[#ffffff] pb-8 text-center">Regístrate con nosotros y disfruta!!</div>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
                    {[
                        { label: 'Nombres', id: 'nombres', value: nombres, onChange: setNombres, type: 'text', placeholder: 'Ingrese sus nombres' },
                        { label: 'Apellidos', id: 'apellidos', value: apellidos, onChange: setApellidos, type: 'text', placeholder: 'Ingrese sus apellidos' },
                        { label: 'Correo', id: 'correo', value: correo, onChange: setCorreo, type: 'email', placeholder: 'Ingrese su correo' },
                        { label: 'Usuario', id: 'usuario', value: usuario, onChange: setUsuario, type: 'text', placeholder: 'Ingrese su usuario' },
                        { label: 'Password', id: 'password', value: password, onChange: setPassword, type: 'password', placeholder: '••••••••••' },
                        { label: 'Teléfono', id: 'telefono', value: telefono, onChange: setTelefono, type: 'text', placeholder: 'Ingrese su teléfono' },
                        { label: 'Dirección', id: 'direccion', value: direccion, onChange: setDireccion, type: 'text', placeholder: 'Ingrese su dirección' },
                        { label: 'Edad', id: 'edad', value: edad, onChange: setEdad, type: 'number', placeholder: 'Ingrese su edad' },
                    ].map(({ label, id, value, onChange, type, placeholder }) => (
                        <div key={id} className="pb-2">
                            <label htmlFor={id} className="label-text block mb-2 text-sm font-medium text-[#ffffff]">{label}</label>
                            <input
                                type={type}
                                name={id}
                                id={id}
                                className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                                placeholder={placeholder}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        </div>
                    ))}
                    {error && <p className="text-red-600">{error}</p>}
                    <button type="submit" className="w-full text-[#ffffff] bg-[#1c8be6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">Registrarse</button>
                    <div className="text-sm font-light text-[#ffffff] text-center">
                        ¿Ya estás vinculado con nosotros? <span className="font-medium text-[#0059ff] hover:underline cursor-pointer" onClick={() => navigate('/Login')}>Iniciar Sesión</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registro;
