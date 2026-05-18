Deployment notes — SHONAPRINCEAUTH

Overview
--------
This file documents the minimal steps to deploy the backend to Render (or similar) and the frontend to Vercel/Netlify, with notes about cross-site cookies, CORS, and environment variables.

Required environment variables (backend - `SP_Server` service)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Strong secret for signing JWTs
- `FRONTEND_URL` — Final frontend URL (e.g. https://myapp.vercel.app)
- `NODE_ENV` — `production` in production
- `COOKIE_DOMAIN` (optional) — If you need cookies to be limited to a specific domain (e.g. `.example.com`)

Backend (Render) checklist
- Set the service root to `SP_Server`.
- Build / Start command: `node server.js` (or set `start` script in `package.json`).
- Set the environment variables above in Render's dashboard.
- Ensure `FRONTEND_URL` exactly matches your deployed frontend origin.
- For secure cross-site cookies: set `NODE_ENV=production` so cookies are sent with `secure: true` and `sameSite: 'none'`.
- If Render is behind a proxy (it is), the server must call `app.set('trust proxy', 1)` so Express can set secure cookies correctly.

CORS & Cookies
- Backend must enable CORS with `credentials: true` and `origin` matching your frontend origin.
- Client must send credentials on requests (Axios: `axios.defaults.withCredentials = true`).
- Cookies set with `SameSite: 'none'` require `Secure: true` and a HTTPS frontend.

Frontend (Vercel / Netlify)
- Build the Vite app and deploy normally.
- Ensure all API calls target the correct backend origin and include credentials.
  - Example Axios config in `src/App.jsx`: `axios.defaults.withCredentials = true; axios.defaults.baseURL = process.env.REACT_APP_API || 'https://api.example.com'`
- Set environment variable `REACT_APP_API` or similar in deployment platform to match the backend origin.

Testing after deploy
1. Open browser devtools → Application → Cookies and confirm token cookie is present, has `Secure` and `SameSite=None` in production.
2. Make an authenticated API call from the frontend; verify cookie is sent and server accepts it.
3. If cookies are not present, check `FRONTEND_URL` vs cookie domain and `trust proxy` setting.

Troubleshooting
- If cookies are set but not sent to the server, ensure the request is cross-site and has credentials enabled, and the cookie has `SameSite=None; Secure`.
- If your hosting injects a proxy, make sure `app.set('trust proxy', 1)` is present.
- If you see mixed-content errors, ensure your frontend and backend are served over HTTPS.

Notes
- Do not store sensitive secrets in client code or in public places. Use platform env variables.
- If you want automated CI/CD, link GitHub repo to Render (backend) and Vercel (frontend) and add the environment variables in the respective dashboards.

Contact
- Ask me to run post-deploy checks or to create a production-ready CI config for both services.
