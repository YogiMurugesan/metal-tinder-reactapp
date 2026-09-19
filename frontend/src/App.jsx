import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import AuthPage from './auth/AuthPage.jsx';
import Dashboard from './screens/Dashboard.jsx';
import CreateDataset from './screens/CreateDataset/CreateDataset.jsx';
import Overview from './screens/Overview.jsx';
import SampleDetail from './screens/SampleDetail.jsx';
import { STORE, load } from './utils/helpers.js';
import { useAuthStore } from './store/authStore.js';

// Guards any route placed inside it — if there's no logged-in user,
// redirect to /login instead of rendering the protected page at all.
// `replace` means the redirect doesn't add an extra entry to browser
// history, so the back button doesn't bounce you into a dead page.
function RequireAuth({ children }) {
  const user = useAuthStore(state => state.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Thin adapter: reads the dataset id straight out of the URL
// (useParams) instead of it being passed down as a prop from a parent
// screen object. This is what makes /dataset/abc123 a real, sharable,
// bookmarkable, back-button-friendly address — not just an in-memory
// app state that vanishes on refresh.
function OverviewRoute({ datasets, onUpdate, onDelete }) {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const dataset = datasets.find(d => d.id === datasetId);
  if (!dataset) return <Navigate to="/" replace />;

  return (
    <Overview
      dataset={dataset}
      onBack={() => navigate('/')}
      onUpdate={onUpdate}
      onDelete={() => onDelete(dataset.id)}
      onOpenSample={sampleId => navigate(`/dataset/${dataset.id}/sample/${sampleId}`)}
    />
  );
}

function SampleDetailRoute({ datasets, onUpdate }) {
  const { datasetId, sampleId } = useParams();
  const navigate = useNavigate();
  const dataset = datasets.find(d => d.id === datasetId);
  if (!dataset) return <Navigate to="/" replace />;

  return (
    <SampleDetail
      dataset={dataset}
      sampleId={sampleId}
      onBack={() => navigate(`/dataset/${dataset.id}`)}
      onUpdate={onUpdate}
    />
  );
}

function App() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState(load);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(STORE, JSON.stringify(datasets));
  }, [datasets]);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(''), 2600);
    return () => clearTimeout(id);
  }, [notice]);

  const updateDataset = next =>
    setDatasets(all => all.map(d => (d.id === next.id ? next : d)));

  const deleteDataset = id => {
    if (confirm('Delete this dataset and all its samples?')) {
      setDatasets(all => all.filter(d => d.id !== id));
      navigate('/');
      setNotice('Dataset deleted');
    }
  };

  return (
    <main className="app-shell">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <AuthPage />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard
                datasets={datasets}
                user={user}
                onLogout={logout}
                onCreate={() => navigate('/create')}
                onOpen={id => navigate(`/dataset/${id}`)}
                onRename={(id, name) =>
                  setDatasets(all => all.map(d => (d.id === id ? { ...d, name } : d)))
                }
                onDelete={deleteDataset}
              />
            </RequireAuth>
          }
        />

        <Route
          path="/create"
          element={
            <RequireAuth>
              <CreateDataset
                onBack={() => navigate('/')}
                onCreate={created => {
                  setDatasets(all => [...all, created]);
                  navigate(`/dataset/${created.id}`);
                }}
              />
            </RequireAuth>
          }
        />

        <Route
          path="/dataset/:datasetId"
          element={
            <RequireAuth>
              <OverviewRoute datasets={datasets} onUpdate={updateDataset} onDelete={deleteDataset} />
            </RequireAuth>
          }
        />

        <Route
          path="/dataset/:datasetId/sample/:sampleId"
          element={
            <RequireAuth>
              <SampleDetailRoute datasets={datasets} onUpdate={updateDataset} />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}

export default App;
