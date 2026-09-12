import Header from './Header.jsx'
import Progress from './Progress.jsx'

export default function Home({ datasets, onCreate, onOpen, onRename, onDelete }) {
  return <>
    <Header title="Datasets" action={<button className="text-button" onClick={onCreate}>+ New</button>} />
    <section className="page home-page">
      <div className="hero"><div><p className="eyebrow">METAL TINDER</p><h2>Capture better training data.</h2><p>Pair your images with spoken descriptions, right from your phone.</p></div><button className="primary-button desktop-create" onClick={onCreate}>＋ Create dataset</button></div>
      {datasets.length === 0 ? <div className="empty"><div className="empty-icon">▣</div><h3>No datasets yet</h3><p>Import images and record a description for every sample.</p><button className="primary-button" onClick={onCreate}>Create dataset</button></div> : <div className="dataset-list">{datasets.map(dataset => {
        const total = dataset.samples.length
        const done = dataset.samples.filter(sample => sample.status === 'complete').length
        return <article className="dataset-card" key={dataset.id} onClick={() => onOpen(dataset.id)}><div className="dataset-icon">▣</div><div className="dataset-copy"><h3>{dataset.name}</h3><p>{done} of {total} annotated · {dataset.category || 'Industrial'}</p><Progress value={total ? done / total : 0} /></div><div className="card-menu" onClick={event => event.stopPropagation()}><button className="icon-button" aria-label="Dataset actions" onClick={() => { const name = prompt('Rename dataset', dataset.name); if (name?.trim()) onRename(dataset.id, name.trim()) }}>•••</button><button className="delete-link" onClick={() => onDelete(dataset.id)}>Delete</button></div></article>
      })}</div>}
    </section>
    <button className="fab" onClick={onCreate} aria-label="Create dataset">＋</button>
  </>
}
