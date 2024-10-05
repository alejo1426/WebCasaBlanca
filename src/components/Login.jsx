import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { supabase } from '../../supabaseClient'; 
import bcrypt from 'bcryptjs';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones simples
        if (!usuario || !password) {
            setError('Por favor completa todos los campos.');
            return;
        }

        // Obtén el usuario de tu base de datos
        const { data: user, error: fetchError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('usuario', usuario)
            .single();

        if (fetchError) {
            setError('Error al acceder verifica los datos e intentalo de nuevo.');
            return;
        }

        // Compara la contraseña hasheada con la contraseña ingresada
        const isPasswordValid = user && await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            setError('Error al acceder verifica los datos e intentalo de nuevo.');
        } else {
            navigate('/Sidebar');
        }
    };

    return (
        <div className="flex flex-col w-full max-w-lg mx-auto p-30 md:p-20 2xl:p-30 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-col justify-center items-center gap-4 pb-4">
                <div>
                    <img src="../../public/assets/logo.jpeg" width="200" alt="Logo" />
                </div>
                <h1 className="text-4xl font-bold text-[#006aff]">CASA BLANCA</h1>
            </div>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-[#111827]">Usuario</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </span>
                        <input 
                            type="text" 
                            name="usuario" 
                            id="usuario" 
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                            placeholder="user123" 
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)} 
                            autoComplete="off" 
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                <path d="M12 8v8"></path>
                                <path d="m8.5 14 7-4"></path>
                                <path d="m8.5 10 7 4"></path>
                            </svg>
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••••" 
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            autoComplete="current-password" 
                        />
                    </div>
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="w-full text-[#ffffff] bg-[#0d00ff] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">Ingresar</button>
                <div className="text-sm font-light text-[#000000] text-center">
                    No tienes una cuenta? <span className="font-medium text-[#0d00ff] hover:underline cursor-pointer" onClick={handleSignUpClick}>Registrarse</span>
                </div>
            </form>
        </div>
    );
};

export default Login;
