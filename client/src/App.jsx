import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/Dashboard';
import './App.css';
import ListVehiculesPage from './components/ListVehiculesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/vehicules" element={<ListVehiculesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;