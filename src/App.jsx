import { useEffect, useState } from 'react'
import CreateDataset from './components/CreateDataset.jsx'
import DatasetOverview from './components/DatasetOverview.jsx'
import Home from './components/Home.jsx'
import SampleDetail from './components/SampleDetail.jsx'
import { loadDatasets, STORE } from './utils/dataset.js'

function App() {
  const [datasets, setDatasets] = useState(loadDatasets)
  const [screen, setScreen] = useState({ name: 'home' })
  const [notice, setNotice] = useState('')
  const dataset = datasets.find(item => item.id === screen.datasetId)

  useEffect(() => localStorage.setItem(STORE, JSON.stringify(datasets)), [datasets])
  useEffect(() => {
    if (!notice) return undefined
    const timeout = setTimeout(() => setNotice(''), 2600)
    return () => clearTimeout(timeout)
  }, [notice])

  const updateDataset = next => setDatasets(all => all.map(item => item.id === next.id ? next : item))
  const deleteDataset = id => {
    if (!confirm('Delete this dataset and all its samples?')) return
    setDatasets(all => all.filter(item => item.id !== id))
    setScreen({ name: 'home' })
    setNotice('Dataset deleted')
  }

  return <main className="app-shell">
    {screen.name === 'home' && <Home datasets={datasets} onCreate={() => setScreen({ name: 'create' })} onOpen={datasetId => setScreen({ name: 'overview', datasetId })} onRename={(id, name) => setDatasets(all => all.map(item => item.id === id ? { ...item, name } : item))} onDelete={deleteDataset} />}
    {screen.name === 'create' && <CreateDataset onBack={() => setScreen({ name: 'home' })} onCreate={created => { setDatasets(all => [...all, created]); setScreen({ name: 'overview', datasetId: created.id }) }} />}
    {screen.name === 'overview' && dataset && <DatasetOverview dataset={dataset} onBack={() => setScreen({ name: 'home' })} onUpdate={updateDataset} onDelete={() => deleteDataset(dataset.id)} onOpenSample={sampleId => setScreen({ name: 'sample', datasetId: dataset.id, sampleId })} />}
    {screen.name === 'sample' && dataset && <SampleDetail dataset={dataset} sampleId={screen.sampleId} onBack={() => setScreen({ name: 'overview', datasetId: dataset.id })} onUpdate={updateDataset} />}
    {notice && <div className="toast">{notice}</div>}
  </main>
}

export default App
