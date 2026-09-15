import { useState } from 'react';
import { login, signup } from './api.js';
import './auth.css';

export default function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';

  const update = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  };

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = isSignup ? await signup(form) : await login({ email: form.email, password: form.password });
      localStorage.setItem('metal-tinder-user', JSON.stringify(result.user));
      onAuthenticated(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand"><span>MT</span><strong>Metal Tinder</strong></div>
        <div className="auth-copy">
          <p className="eyebrow">DATASET WORKSPACE</p>
          <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p>{isSignup ? 'Create an account to start managing your annotation datasets.' : 'Sign in to continue to your annotation workspace.'}</p>
        </div>

        <div className="auth-tabs">
          <button className={!isSignup ? 'active' : ''} onClick={() => { setMode('login'); setError(''); }}>Login</button>
          <button className={isSignup ? 'active' : ''} onClick={() => { setMode('signup'); setError(''); }}>Sign up</button>
        </div>

        <form onSubmit={submit} className="auth-form">
          {isSignup && <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name" /></label>}
          <label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" /></label>
          <label>Password<input name="password" type="password" value={form.password} onChange={update} placeholder="Minimum 6 characters" autoComplete={isSignup ? 'new-password' : 'current-password'} /></label>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-submit" disabled={loading}>{loading ? 'Please wait…' : isSignup ? 'Create account' : 'Login'}</button>
        </form>

        <p className="auth-note">Learning project: React → REST API → JSON file</p>
      </section>
    </main>
  );
}
