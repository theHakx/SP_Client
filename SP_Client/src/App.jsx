import axios from 'axios';
import AuthPage from './Pages/AuthPage';
import InstructionsPage from './Pages/InstructionsPage/InstructionsPage';
import './App.css'; // Global resets if you have any

// CRITICAL: Force Axios to send and accept cookies across origins automatically
axios.defaults.withCredentials = true;

function App() {
  const path = window.location.pathname;

  if (path === '/instructions') {
    return (
      <div className="app-container">
        <InstructionsPage />
      </div>
    );
  }

  return (
    <div className="app-container">
      <AuthPage />
    </div>
  );
}

export default App;