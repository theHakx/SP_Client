import { useState } from 'react';
import axios from 'axios';
import './AuthPage.scss';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Hardcoded production endpoint to bypass Vercel environment variable parsing bugs
const API_URL = 'https://sp-server-odyz.onrender.com/api';

function AuthPage() {
  const [authMode, setAuthMode] = useState('vulnerable');
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

 const handleLogin = async () => {
    // Standard explicit application config for cross-origin tracking
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      if (authMode === 'vulnerable') {
        // Pass an explicit empty body object {} as the second argument
        const res = await axios.post(`${API_URL}/auth/login-vulnerable`, {}, config);
        localStorage.setItem('auth_token', res.data.token);
        setUser(res.data.user);
      } else {
        // Pass an explicit empty body object {} as the second argument
        const res = await axios.post(`${API_URL}/auth/login-secure`, {}, config);
        setUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
      alert('Login pipeline failed. Please verify server availability.');
    }
  };

  const fetchProtectedData = async () => {
    const config = {};
    if (authMode === 'vulnerable') {
      const token = localStorage.getItem('auth_token');
      config.headers = { Authorization: `Bearer ${token}` };
    }

    try {
      const res = await axios.get(`${API_URL}/dashboard/data`, config);
      setDashboardData(res.data);
    } catch (error) {
      console.error(error);
      alert('Unauthorized: Session validation failed.');
    }
  };

  const simulateXSSAttack = () => {
    const stolenToken = localStorage.getItem('auth_token');

    if (stolenToken) {
      alert(` [XSS EXPLOIT SUCCESSFUL]\n\nInjected script successfully executed an internal memory scrape!\n\n---------------------------------------------------\n⚠️ EXFILTRATED USER CREDENTIAL PAYLOAD:\n---------------------------------------------------\n• Full Name: Clive Hakaperi\n• Identity ID: 4182\n• System Role: Agent (Level 3 Premium)\n• Verified Email: c.hakaperi@omnicontact.co.zw\n• Gender / Sex: Male\n• Date of Birth: 1994-08-14\n• Document Reference: 29-234567-X-29\n\n---------------------------------------------------\n EXFILTRATED AUTHENTICATION TOKEN:\n---------------------------------------------------\n${stolenToken.substring(0, 60)}...\n\n---------------------------------------------------\nCRITICAL IMPACT:\nAn attacker running a tracking pixel or compromised script dependency has just scraped your user's full identity and active session keys.`);
    } else {
      alert(' [XSS EXPLOIT FAILED]\n\nMalicious script executed document.cookie scan.\nResult: ACCESS DENIED.\n\nYour session signatures and user records are isolated under server-side HttpOnly architecture. Frontend JavaScript cannot see or extract this data layer!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setDashboardData(null);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="background-decor" />
      <header className="lab-header">
        <div className="lab-header-left">
          <div className="lab-badge">SECURITY LAB</div>
          <div>
            <h1 className="title">Shona Prince Secure Auth Lab</h1>
            <p className="subtitle">A polished demo of session isolation, token handling, and attack surface awareness.</p>
          </div>
        </div>
        <a href="/instructions" className="docs-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Operations Manual
        </a>
      </header>

      <div className="status-banner">
        <span className="status-chip">{authMode === 'vulnerable' ? 'VULNERABLE MODE' : 'SECURE MODE'}</span>
        <p>
          {authMode === 'vulnerable'
            ? 'Storing tokens in localStorage exposes client-side secrets to browser scripts and XSS attacks.'
            : 'HttpOnly cookie handling keeps your session tokens hidden from JavaScript and reduces exploitation risk.'}
        </p>
      </div>

      <div className="workspace-grid">
        <div className="panel operation-panel">
          <div className="panel-heading">
            <h3 className="section-title">Authentication Workflow</h3>
            <p className="section-copy">Choose your mode and observe how the client handles token state.</p>
          </div>

          <div className="mode-selector-panel compact">
            <label className={`mode-card ${authMode === 'vulnerable' ? 'active' : ''}`}>
              <input
                type="radio"
                name="auth"
                checked={authMode === 'vulnerable'}
                onChange={() => {
                  handleLogout();
                  setAuthMode('vulnerable');
                }}
              />
              <div>
                <div className="mode-title">LocalStorage</div>
                <p className="mode-description">Quick session persistence with direct JS access.</p>
              </div>
            </label>

            <label className={`mode-card ${authMode === 'secure' ? 'active' : ''}`}>
              <input
                type="radio"
                name="auth"
                checked={authMode === 'secure'}
                onChange={() => {
                  handleLogout();
                  setAuthMode('secure');
                }}
              />
              <div>
                <div className="mode-title">HttpOnly Cookie</div>
                <p className="mode-description">Server-bound cookies kept out of client-side script scope.</p>
              </div>
            </label>
          </div>

          {!user ? (
            <div className="action-box">
              <p className="box-text">No active session detected. Start the flow by authenticating the demo agent.</p>
              <button onClick={handleLogin} className="btn btn-primary">
                Launch Authentication
              </button>
            </div>
          ) : (
            <div className="action-box">
              <div className="identity-badge">
                <div className="badge-row">
                  <span className="label">Agent Identity</span>
                  <strong className="highlight">{user.firstName}</strong>
                </div>
                <div className="badge-row">
                  <span className="label">Privilege</span>
                  <span className="badge">{user.role}</span>
                </div>
              </div>

              <div className="button-group">
                <button onClick={fetchProtectedData} className="btn btn-success">
                  Retrieve Protected Payload
                </button>
                <button onClick={handleLogout} className="btn btn-secondary">
                  End Session
                </button>
              </div>
            </div>
          )}

          {dashboardData && (
            <div className="dashboard-card">
              <h4>Protected Data Snapshot</h4>
              <div className="dashboard-row">
                <span>Balance</span>
                <strong>{dashboardData.balance}</strong>
              </div>
              <div className="dashboard-row">
                <span>Transactions</span>
                <strong>{dashboardData.transactionCount}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="panel exploit-panel">
          <div className="panel-heading">
            <h3 className="section-title">Threat Surface Simulator</h3>
            <p className="section-copy">Trigger the demonstration payload and see the security gap in real time.</p>
          </div>

          <div className="exploit-guide">
            <p className="box-text-small">
              This module simulates a malicious script trying to harvest in-browser tokens. It helps you compare attack impact across both persistence modes.
            </p>
            <button onClick={simulateXSSAttack} className="btn btn-danger">
              Execute XSS Payload
            </button>
          </div>

          {dashboardData && (
            <div className="ledger-stream-box">
              <h4 className="stream-title">Protected Ledger Stream</h4>
              <p>Isolated ledger balance: <strong>{dashboardData.balance}</strong></p>
              <p>Concurrent batch count: <strong>{dashboardData.transactionCount}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
