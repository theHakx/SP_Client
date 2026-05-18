import axios from 'axios';
import AuthPage from './Pages/AuthPage';
import './App.css'; // Global resets if you have any

// CRITICAL: Force Axios to send and accept cookies across origins automatically
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="app-container">
      <AuthPage />
    </div>
  );
}

export default App;