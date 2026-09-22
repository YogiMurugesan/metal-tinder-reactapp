import { useEffect, useState } from 'react';
import AuthPage from './auth/AuthPage.jsx';
import Dashboard from './screens/Dashboard.jsx';
import CreateDataset from './screens/CreateDataset/CreateDataset.jsx';
import Overview from './screens/Overview.jsx';
import SampleDetail from './screens/SampleDetail.jsx';
import { STORE, load } from './utils/helpers.js';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';

function App() {
  const { user, logout } = useAuth();

  const [datasets, setDatasets] = useState(load);
  const [screen, setScreen] = useState({ name: 'dashboard' });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(STORE, JSON.stringify(datasets));
  }, [datasets]);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(''), 2600);
    return () => clearTimeout(id);
  }, [notice]);

  const dataset = datasets.find(d => d.id === screen.datasetId);

  const updateDataset = next =>
    setDatasets(all => all.map(d => (d.id === next.id ? next : d)));

  const deleteDataset = id => {
    if (confirm('Delete this dataset and all its samples?')) {
      setDatasets(all => all.filter(d => d.id !== id));
      setScreen({ name: 'dashboard' });
      setNotice('Dataset deleted');
    }
  };

  if (!user) return <AuthPage />;

  return (
    <main className="app-shell">
      {screen.name === 'dashboard' && (
        <Dashboard
          datasets={datasets}
          user={user}
          onLogout={logout}
          onCreate={() => setScreen({ name: 'create' })}
          onOpen={id => setScreen({ name: 'overview', datasetId: id })}
          onRename={(id, name) =>
            setDatasets(all => all.map(d => (d.id === id ? { ...d, name } : d)))
          }
          onDelete={deleteDataset}
        />
      )}

      {screen.name === 'create' && (
        <CreateDataset
          onBack={() => setScreen({ name: 'dashboard' })}
          onCreate={created => {
            setDatasets(all => [...all, created]);
            setScreen({ name: 'overview', datasetId: created.id });
          }}
        />
      )}

      {screen.name === 'overview' && dataset && (
        <Overview
          dataset={dataset}
          onBack={() => setScreen({ name: 'dashboard' })}
          onUpdate={updateDataset}
          onDelete={() => deleteDataset(dataset.id)}
          onOpenSample={sampleId =>
            setScreen({ name: 'sample', datasetId: dataset.id, sampleId })
          }
        />
      )}

      {screen.name === 'sample' && dataset && (
        <SampleDetail
          dataset={dataset}
          sampleId={screen.sampleId}
          onBack={() => setScreen({ name: 'overview', datasetId: dataset.id })}
          onUpdate={updateDataset}
        />
      )}

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}

function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default RootApp;
