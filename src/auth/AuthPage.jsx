import { useState, useEffect, useMemo, useCallback } from 'react';
import { login, signup } from './api.js';
import { useAuth } from './AuthContext.jsx';
import './auth.css';

export default function AuthPage() {
  const { login: setAuthenticatedUser } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  // useEffect: runs after render and keeps the page title in sync with the current mode.
  useEffect(() => {
    document.title = mode === 'login' ? 'Login' : 'Sign Up';
    return () => {
      document.title = 'Metal Tinder';
    };
  }, [mode]);

  // useMemo: calculates validation only when the form values change.
  const isLoginValid = useMemo(() => {
    return form.email.trim() !== '' && form.password.trim() !== '';
  }, [form.email, form.password]);

  // useCallback: keeps the input-change function stable between renders.
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';

  const update = handleChange;

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = isSignup ? await signup(form) : await login({ email: form.email, password: form.password });
      setAuthenticatedUser(result.user);
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
