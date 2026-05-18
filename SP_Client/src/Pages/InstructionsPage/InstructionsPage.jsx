import './InstructionsPage.scss';

function InstructionsPage() {
  return (
    <div className="instructions-page-wrapper">
      <div className="background-decor" />

      <header className="lab-header">
        <div className="lab-badge">Documentation</div>
        <div>
          <h1 className="title">Security Audit Lab — Operations Manual</h1>
          <p className="subtitle">
            A complete technical reference for navigating the Shona Prince Authentication Lab.
            Understand the attack surface, test the vulnerability, and learn how HttpOnly cookies close the exploit vector.
          </p>
        </div>
      </header>

      {/* SECTION 1: Quick-Start Maneuvering Guide */}
      <section className="info-section">
        <div className="section-header">
          <div className="section-icon danger">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div>
            <h2 className="section-title">Section 1 — Quick-Start Maneuvering Guide</h2>
            <p className="section-subtitle">Follow this controlled sequence to observe the exploit in both modes.</p>
          </div>
        </div>

        <div className="step-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Select LocalStorage Mode</h3>
              <p>
                On the <strong>Authentication Workflow</strong> panel, select the
                <span className="chip chip-local">LocalStorage</span> option.
                This configures the client to persist tokens directly in the browser's local storage.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Launch Authentication</h3>
              <p>
                Click the <strong>Launch Authentication</strong> button to initiate a simulated login.
                The backend will respond with a JSON payload containing a raw JWT token stored in the response body.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number danger">03</div>
            <div className="step-content">
              <h3>Execute XSS Payload</h3>
              <p>
                In the <strong>Threat Surface Simulator</strong> panel, click the red
                <span className="chip chip-danger">Inject XSS Payload</span> button.
                This simulates a malicious script scraping <code>localStorage</code>.
              </p>
              <div className="extracted-data">
                <span className="extract-label">Exfiltrated:</span>
                <span>Name, Email, DOB, National ID, JWT Token</span>
              </div>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Switch to HttpOnly Cookies</h3>
              <p>
                Clear your session and select the
                <span className="chip chip-secure">HttpOnly Cookie</span> mode.
                Re-authenticate — the token is now baked into an <code>HttpOnly</code> cookie by the server.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number secure">05</div>
            <div className="step-content">
              <h3>Re-run the Exploit</h3>
              <p>
                Click <strong>Inject XSS Payload</strong> again. The malicious script now receives
                <code>undefined</code> — the browser natively blocks JavaScript access to
                <code>HttpOnly</code> cookies. The exploit is neutralized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Attack Vector Explanation */}
      <section className="info-section">
        <div className="section-header">
          <div className="section-icon warning">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h2 className="section-title">Section 2 — The Attack Vector Explanation</h2>
            <p className="section-subtitle">Why client-side token storage creates a critical security gap.</p>
          </div>
        </div>

        <div className="threat-grid">
          <div className="threat-card threat-exposure">
            <h3>The Vulnerability</h3>
            <p>
              Storing authentication tokens in <code>localStorage</code> or <code>sessionStorage</code> exposes them to any JavaScript executing in the browser context. This creates a direct attack surface for:
            </p>
            <ul className="threat-list">
              <li>
                <span className="threat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </span>
                <span><strong>Cross-Site Scripting (XSS)</strong> — Injected malicious scripts that read and exfiltrate token data</span>
              </li>
              <li>
                <span className="threat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </span>
                <span><strong>Tracking Pixels &amp; Malvertising</strong> — Third-party scripts with indirect DOM access</span>
              </li>
              <li>
                <span className="threat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <span><strong>Compromised Dependencies</strong> — Supply-chain attacks on npm packages that skim storage</span>
              </li>
            </ul>
          </div>

          <div className="threat-card threat-impact">
            <h3>Real-World Impact</h3>
            <p>
              Once a token is stolen, an attacker can:
            </p>
            <div className="impact-grid">
              <div className="impact-item">
                <span className="impact-label">Session Hijacking</span>
                <p>Impersonate the user on all authenticated endpoints</p>
              </div>
              <div className="impact-item">
                <span className="impact-label">Data Exfiltration</span>
                <p>Access PII, financial records, and private communications</p>
              </div>
              <div className="impact-item">
                <span className="impact-label">Lateral Movement</span>
                <p>Use the token against related services sharing the same auth domain</p>
              </div>
              <div className="impact-item">
                <span className="impact-label">Identity Theft</span>
                <p>Harvest identity documents stored in session profiles</p>
              </div>
            </div>
          </div>

          <div className="threat-card threat-resolution">
            <h3>The Fix</h3>
            <p>
              The <strong>HttpOnly</strong> cookie strategy eliminates client-side token access entirely:
            </p>
            <ul className="resolution-list">
              <li>
                <span className="res-badge">httpOnly: true</span>
                <span>JavaScript cannot read or write the cookie — it's invisible to <code>document.cookie</code></span>
              </li>
              <li>
                <span className="res-badge">sameSite: 'strict'</span>
                <span>Blocks cross-origin requests from sending the cookie — neutralizes CSRF</span>
              </li>
              <li>
                <span className="res-badge">secure: true</span>
                <span>Cookie is transmitted only over HTTPS — prevents MITM token interception</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: Backend Blueprint Comparison */}
      <section className="info-section">
        <div className="section-header">
          <div className="section-icon code">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div>
            <h2 className="section-title">Section 3 — Backend Blueprint Comparison</h2>
            <p className="section-subtitle">Architectural differences between vulnerable and secure token delivery.</p>
          </div>
        </div>

        <div className="code-grid">
          <div className="code-column">
            <div className="code-block-header danger-header">
              <span className="block-label">Vulnerable — Raw JSON Response</span>
              <span className="block-badge badge-danger">INSECURE</span>
            </div>
            <div className="code-block">
              <pre><code>{`const loginVulnerable = (req, res) => {`}</code></pre>
              <pre><code>{`  const token = createToken();`}</code></pre>
              <pre><code>{``}</code></pre>
              <pre><code>{`  // Token is delivered as plain JSON`}</code></pre>
              <pre><code>{`  return res.json({`}</code></pre>
              <pre><code>{`    success: true,`}</code></pre>
              <pre><code>{`    token,        // ← RAW TOKEN EXPOSED`}</code></pre>
              <pre><code>{`    user: createUserProfile()`}</code></pre>
              <pre><code>{`  });`}</code></pre>
              <pre><code>{`};`}</code></pre>
            </div>
            <div className="code-explanation">
              <div className="exp-item">
                <span className="exp-icon exp-bad">✕</span>
                <span>Token lands in <code>response.data.token</code></span>
              </div>
              <div className="exp-item">
                <span className="exp-icon exp-bad">✕</span>
                <span>Client stores it in <code>localStorage</code></span>
              </div>
              <div className="exp-item">
                <span className="exp-icon exp-bad">✕</span>
                <span>Any injected script can read it via <code>localStorage.getItem()</code></span>
              </div>
            </div>
          </div>

          <div className="code-column">
            <div className="code-block-header secure-header">
              <span className="block-label">Secure — Server-Managed Cookie</span>
              <span className="block-badge badge-secure">PROTECTED</span>
            </div>
            <div className="code-block">
              <pre><code>{`const loginSecure = (req, res) => {`}</code></pre>
              <pre><code>{`  const token = createToken();`}</code></pre>
              <pre><code>{``}</code></pre>
              <pre><code>{`  res.cookie('token', token, {`}</code></pre>
              <pre><code>{`    httpOnly: true,   // ← JS FIREWALL`}</code></pre>
              <pre><code>{`    secure: true,     // ← HTTPS MANDATE`}</code></pre>
              <pre><code>{`    sameSite: 'none', // ← CSRF BUFFER`}</code></pre>
              <pre><code>{`    maxAge: 86400000   // ← 24h TTL`}</code></pre>
              <pre><code>{`  });`}</code></pre>
              <pre><code>{``}</code></pre>
              <pre><code>{`  return res.json({ success: true });`}</code></pre>
              <pre><code>{`};`}</code></pre>
            </div>
            <div className="code-explanation">
              <div className="exp-item">
                <span className="exp-icon exp-good">✓</span>
                <span>Token is set by the server in a <code>Set-Cookie</code> header</span>
              </div>
              <div className="exp-item">
                <span className="exp-icon exp-good">✓</span>
                <span>Browser stores it and sends it automatically on subsequent requests</span>
              </div>
              <div className="exp-item">
                <span className="exp-icon exp-good">✓</span>
                <span>JavaScript has <strong>zero access</strong> — <code>document.cookie</code> returns an empty string</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flags-breakdown">
          <h3>Cookie Flag Reference</h3>
          <div className="flags-grid">
            <div className="flag-card">
              <div className="flag-header">
                <span className="flag-name">httpOnly</span>
                <span className="flag-value">true</span>
              </div>
              <p>
                The <strong>JavaScript firewall.</strong> When set, the browser refuses to expose this cookie to any DOM scripting API. An XSS payload calling <code>document.cookie</code> will not see this value.
              </p>
            </div>
            <div className="flag-card">
              <div className="flag-header">
                <span className="flag-name">sameSite</span>
                <span className="flag-value">'none'</span>
              </div>
              <p>
                The <strong>CSRF buffer.</strong> Controls when the cookie is sent with cross-origin requests. <code>'strict'</code> blocks all cross-site usage; <code>'lax'</code> allows it on top-level navigations; <code>'none'</code> permits full cross-origin but requires <code>secure: true</code>.
              </p>
            </div>
            <div className="flag-card">
              <div className="flag-header">
                <span className="flag-name">secure</span>
                <span className="flag-value">true</span>
              </div>
              <p>
                The <strong>HTTPS encryption mandate.</strong> The browser will only transmit this cookie over an encrypted (HTTPS) connection. Prevents token interception via man-in-the-middle attacks on unencrypted networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-footer">
        <a href="/" className="footer-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Return to Security Lab
        </a>
      </div>
    </div>
  );
}

export default InstructionsPage;
