import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import Recommendation from './pages/Recommendation';
import Register from './pages/Register';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
