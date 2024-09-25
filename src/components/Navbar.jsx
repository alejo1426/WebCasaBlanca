import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <Link to="/" className="text-xl font-bold">
                Inicio
            </Link>
            <Link to="/Login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign In
                </button>
            </Link>
        </nav>
    );
};

export default Navbar;