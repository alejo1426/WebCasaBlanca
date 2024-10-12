import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importar jwt-decode

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegistroClick = () => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones simples
        if (!usuario || !password) {
            setError('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usuario, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Error al acceder, verifica los datos e inténtalo de nuevo.');
                return;
            }

            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', data.token);

            // Decodificar el token para obtener el rol del usuario
            const decodedToken = jwtDecode(data.token);

            navigate('/Dashboard');

        } catch (error) {
            setError(`Error en la conexión: ${error.message}`);
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
                <source src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Videos/Login.mp4?t=2024-10-12T03%3A52%3A39.552Z" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Contenido del formulario */}
            <div className="flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10  bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10">
                <div className="flex flex-col justify-center items-center gap-4 pb-4">
                    <div>
                        <img src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Img/logo.jpeg" width="150" alt="Logo" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#006aff]">CASA BLANCA</h1>
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-[#ffffff]">Usuario</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                {/* SVG Icon */}
                            </span>
                            <input 
                                type="text" 
                                name="usuario" 
                                id="usuario" 
                                className="pl-12 mb-2 bg-white text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                                placeholder="user123" 
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)} 
                                autoComplete="off" 
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#ffffff]">Password</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                {/* SVG Icon */}
                            </span>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••••" 
                                className="pl-12 mb-2 bg-white text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                autoComplete="current-password" 
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    <button type="submit" className="w-full text-[#ffffff] bg-[#1c8be6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">Ingresar</button>
                    <div className="text-sm font-light text-[#ffffff] text-center">
                        No tienes una cuenta? <span className="font-medium text-[#0059ff] hover:underline cursor-pointer" onClick={handleRegistroClick}>Registrarse</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
