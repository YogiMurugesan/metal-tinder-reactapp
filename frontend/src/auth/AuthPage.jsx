import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login, signup } from './api.js';
import { useAuthStore } from '../store/authStore.js';

// The route itself decides the mode now ("/login" vs "/signup"),
// instead of local component state — this is what makes each page
// separately linkable and bookmarkable, which a hand-rolled screen
// object never gave us.
export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);
  const isSignup = location.pathname === '/signup';

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const update = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  // useMutation (TanStack Query) wraps the network call and gives us
  // isPending / isError / error for free — no manual loading/error
  // useState pair to keep in sync by hand.
  const mutation = useMutation({
    mutationFn: () =>
      isSignup ? signup(form) : login({ email: form.email, password: form.password }),
    onSuccess: result => {
      setUser(result.user); // Zustand store — persists to localStorage automatically
      navigate('/', { replace: true });
    },
  });

  const submit = event => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-9 h-9 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm">MT</span>
          <strong className="font-extrabold text-slate-900">Metal Tinder</strong>
        </div>

        <p className="text-xs font-bold tracking-wide text-blue-600 mb-1">DATASET WORKSPACE</p>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {isSignup ? 'Create an account to start managing your annotation datasets.' : 'Sign in to continue to your annotation workspace.'}
        </p>

        <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-6 text-sm font-semibold">
          <Link
            to="/login"
            className={`flex-1 text-center py-2 rounded-md transition ${!isSignup ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`flex-1 text-center py-2 rounded-md transition ${isSignup ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            Sign up
          </Link>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {isSignup && (
            <label className="text-sm font-semibold text-slate-700">
              Name
              <input
                name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          )}
          <label className="text-sm font-semibold text-slate-700">
            Email
            <input
              name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Password
            <input
              name="password" type="password" value={form.password} onChange={update} placeholder="Minimum 6 characters"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {mutation.isError && (
            <div className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {mutation.error.message}
            </div>
          )}

          <button
            disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-lg py-2.5 text-sm transition"
          >
            {mutation.isPending ? 'Please wait…' : isSignup ? 'Create account' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-6 text-center">Learning project: React → REST API → JSON file</p>
      </section>
    </main>
  );
}
