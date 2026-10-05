# Metal Tinder — React + Node.js + MongoDB + JWT Authentication

This version uses a simple authentication flow with React, Express, MongoDB, bcrypt and JWT.

## Authentication flow

```text
React Login / Signup
        |
        | POST /api/auth/login or /api/auth/signup
        v
Node.js + Express
        |
        | bcrypt password check/hash
        v
MongoDB
        |
        | JWT token
        v
React AuthContext
        |
        | Authorization: Bearer <token>
        v
Protected API /api/auth/me
```

## 1. Make sure MongoDB Server is running

MongoDB must be running on:

```text
mongodb://127.0.0.1:27017
```

You can verify it with MongoDB Compass or by running `mongosh`.

## 2. Install frontend packages

From the project root:

```bash
npm install
```

## 3. Install backend packages

Open another terminal:

```bash
cd server
npm install
```

## 4. Create the backend environment file

Inside `server`, create a file named `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/metal_tinder
JWT_SECRET=change_this_to_a_long_random_secret
```

Do not commit `.env` to GitHub.

## 5. Start the backend

From the `server` folder:

```bash
npm run dev
```

Expected output:

```text
Connected to MongoDB
Metal Tinder API running at http://localhost:5000
```

## 6. Start the React frontend

Open another terminal in the project root:

```bash
npm run dev
```

Open the Vite URL, normally:

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
```

### Login

```http
POST /api/auth/login
```

### Current user

```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>
```

## What happens during signup?

1. React sends name, email and password.
2. Express validates the input.
3. bcrypt hashes the password.
4. The user is saved in MongoDB.
5. The server creates a JWT token.
6. React stores the token and user information.

## What happens during login?

1. React sends email and password.
2. Express finds the user in MongoDB.
3. bcrypt compares the password with the stored hash.
4. The server creates a JWT token.
5. React stores the token.
6. Future API requests send `Authorization: Bearer <token>`.

## Important

The old `users.json` file is no longer used for authentication. MongoDB is now the user database.

This is a simple learning-project implementation. For production authentication, use HTTPS, secure HttpOnly cookies or another carefully designed token-storage strategy, rate limiting, secret management and other security controls.
