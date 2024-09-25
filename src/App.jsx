import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<><Navbar />
                    <h1 className="text-center text-2xl font-bold mt-4">BIENBENIDO A CASA BLANCA</h1>
                </>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default App;
