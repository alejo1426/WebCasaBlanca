import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Torneos from './components/Torneos';
import Formulario from './components/Form/Formulario';
import Clases from './components/Clases';
import Home from './components/Home';
import About from './components/About'; // Importar el nuevo componente Home
import './App.css';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Torneos" element={<Torneos />} />
                    <Route path="/Clases" element={<Clases />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<SignUp />} />
                    <Route path="/Formulario" element={<Formulario />} />
                    <Route path="/Sidebar" element={<Sidebar />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
