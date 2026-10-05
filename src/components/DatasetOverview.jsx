import { useState } from 'react'
import Header from './Header.jsx'
import Progress from './Progress.jsx'
import { createSample, statusLabel } from '../utils/dataset.js'

export default function DatasetOverview({ dataset, onBack, onUpdate, onDelete, onOpenSample }) {
  const [filter, setFilter] = useState('all')
  const total = dataset.samples.length
  const completed = dataset.samples.filter(sample => sample.status === 'complete').length
  const visibleSamples = dataset.samples.filter(sample => filter === 'all' || sample.status === filter)
  const addImages = async event => {
    const files = [...event.target.files]
    if (!files.length) return
    const samples = await Promise.all(files.map(createSample))
    onUpdate({ ...dataset, samples: [...dataset.samples, ...samples] })
    event.target.value = ''
  }
  const exportData = () => {
    const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json' })
    const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${dataset.name.replace(/\s+/g, '_')}.json` })
    link.click()
    URL.revokeObjectURL(link.href)
  }
  return <>
    <Header title={dataset.name} back={onBack} action={<button className="text-button" onClick={exportData}>Export</button>} />
    <section className="page overview-page"><div className="overview-hero"><div><p className="eyebrow">DATASET</p><h2>{dataset.name}</h2><p>{dataset.description || 'Ready for voice annotation.'}</p></div><button className="outline-danger" onClick={onDelete}>Delete dataset</button></div><section className="stats"><div><strong>{total}</strong><span>Images</span></div><div><strong>{completed}</strong><span>Completed</span></div><div><strong>{total - completed}</strong><span>To record</span></div><div><strong>{Math.round(total ? completed / total * 100 : 0)}%</strong><span>Progress</span></div></section><Progress value={total ? completed / total : 0} /><div className="sample-toolbar"><div className="filters">{[['all', 'All'], ['pending', 'To record'], ['complete', 'Completed']].map(([value, label]) => <button className={filter === value ? 'selected' : ''} key={value} onClick={() => setFilter(value)}>{label}</button>)}</div><label className="secondary-button add-images">＋ Add images<input type="file" accept="image/*" multiple onChange={addImages} /></label></div><div className="samples">{visibleSamples.map(sample => <button className="sample-card" key={sample.id} onClick={() => onOpenSample(sample.id)}><img src={sample.image} alt={sample.name} /><span className={`badge ${sample.status}`}>{statusLabel(sample.status)}</span><div><b>Sample {String(dataset.samples.indexOf(sample) + 1).padStart(2, '0')}</b><small>{sample.name}</small></div></button>)}</div>{!visibleSamples.length && <div className="empty mini"><p>No samples in this filter.</p></div>}</section>
  </>
}
