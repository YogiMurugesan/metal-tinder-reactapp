import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'users.json');
const PORT = 5000;

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

async function readUsers() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeUsers(users) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Metal Tinder API is running' });
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const name = String(req.body.name ?? '').trim();
    const email = String(req.body.email ?? '').trim().toLowerCase();
    const password = String(req.body.password ?? '');

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }
    if (name.length < 2) {
      return res.status(400).json({ success: false, message: 'Name must contain at least 2 characters.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must contain at least 6 characters.' });
    }

    const users = await readUsers();
    if (users.some(user => user.email === email)) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    await writeUsers(users);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Could not create the account.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const email = String(req.body.email ?? '').trim().toLowerCase();
    const password = String(req.body.password ?? '');

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const users = await readUsers();
    const user = users.find(item => item.email === email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    return res.json({
      success: true,
      message: 'Login successful.',
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Could not log in.' });
  }
});

app.listen(PORT, () => {
  console.log(`Metal Tinder API running at http://localhost:${PORT}`);
});
