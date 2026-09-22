# Metal Tinder — React + Node.js API + JSON Authentication

This version starts from the **original uploaded React project**. The previously created Dataset Command Center feature is intentionally **not included**.

## What you will learn

- React controlled forms
- `fetch()` and REST APIs
- Node.js with Express
- HTTP `POST` requests
- CORS between frontend and backend
- JSON-file persistence without a database
- Password hashing with `bcryptjs`
- API validation and HTTP status codes
- Connecting a React login/signup screen to a backend

## Project structure

```text
metal-tinder-reactapp/
├── src/
│   ├── auth/
│   │   ├── AuthPage.jsx
│   │   ├── api.js
│   │   └── auth.css
│   └── ...existing React app...
├── server/
│   ├── data/
│   │   └── users.json
│   ├── package.json
│   └── server.js
├── package.json
└── vite.config.js
```

## 1. Install frontend packages

Open terminal in the project root:

```bash
npm install
```

## 2. Install backend packages

Open a second terminal:

```bash
cd server
npm install
```

Backend packages:

- `express` — Node.js web/API framework
- `cors` — allows the React development server to call the API
- `bcryptjs` — hashes passwords before saving them

No database is used. Accounts are saved in `server/data/users.json`.

## 3. Start the backend

From the `server` folder:

```bash
npm run dev
```

You should see:

```text
Metal Tinder API running at http://localhost:5000
```

Test the health endpoint in a browser:

```text
http://localhost:5000/api/health
```

## 4. Start the React frontend

Open another terminal in the project root:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## API endpoints

### Health

```http
GET /api/health
```

### Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Vinitha",
  "email": "vinitha@example.com",
  "password": "secret123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "vinitha@example.com",
  "password": "secret123"
}
```

## How the communication works

```text
React Signup Form
      |
      | POST /api/auth/signup
      v
Node.js + Express
      |
      | bcrypt hash password
      v
server/data/users.json
```

For login:

```text
React Login Form
      |
      | POST /api/auth/login
      v
Express API
      |
      | read users.json
      | bcrypt.compare()
      v
JSON response
      |
      v
React Dashboard
```

## Important learning note

This is suitable for learning and local development. A JSON file is **not** an appropriate production database for authentication. A production application would normally use a real database, proper session/JWT strategy, HTTPS, rate limiting, secure cookies, secret management, and stronger operational controls.
