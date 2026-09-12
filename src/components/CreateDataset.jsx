import { useState } from 'react'
import Header from './Header.jsx'
import { createId, createSample } from '../utils/dataset.js'

export default function CreateDataset({ onBack, onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Industrial')
  const [language, setLanguage] = useState('English')
  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const pickImages = async event => {
    const files = [...event.target.files]
    if (!files.length) return
    const newImages = await Promise.all(files.map(createSample))
    setImages(current => [...current, ...newImages])
    event.target.value = ''
  }
  const createDataset = () => {
    if (name.trim().length < 3) return setError('Use at least 3 characters for the dataset name.')
    if (!images.length) return setError('Add at least one image before creating the dataset.')
    onCreate({ id: createId(), name: name.trim(), description, category, language, created: new Date().toISOString(), samples: images })
  }
  return <>
    <Header title="Create Dataset" back={onBack} action={<button className="text-button" onClick={() => alert('Import images, then record a spoken description for each sample.')}>Guide</button>} />
    <section className="page create-page"><div className="intro"><div className="intro-icon">◈</div><div><h2>Build a new audio dataset</h2><p>Set up your dataset details and import the images that will become recording samples.</p></div></div><div className="steps"><b>01 <span>Dataset details</span></b><i>›</i><b>02 <span>Import images</span></b><i>›</i><b>03 <span>Start annotating</span></b></div><div className="create-grid"><section className="panel"><h3>✎ Dataset details</h3><p>Give your dataset a clear identity.</p><label>Dataset name <em>*</em><input value={name} maxLength="60" onChange={event => setName(event.target.value)} placeholder="e.g. Industrial Machine Sounds" /></label><label>Description<textarea value={description} maxLength="240" onChange={event => setDescription(event.target.value)} placeholder="What is this dataset being created for?" /></label><div className="two-col"><label>Category<select value={category} onChange={event => setCategory(event.target.value)}>{['Industrial', 'Urban', 'Nature', 'Vehicles', 'Other'].map(option => <option key={option}>{option}</option>)}</select></label><label>Language<select value={language} onChange={event => setLanguage(event.target.value)}>{['English', 'Tamil', 'Hindi', 'Malayalam', 'Other'].map(option => <option key={option}>{option}</option>)}</select></label></div><div className="metadata"><span>✓</span><div><b>Keep metadata with samples</b><small>Store filename, language and recording status.</small></div></div></section><section className="panel image-panel"><h3>▧ Import images</h3><p>Add one or more images from your device.</p><label className="dropzone"><input type="file" accept="image/*" multiple onChange={pickImages} /><strong>Choose images</strong><span>JPG, PNG, or WebP · multiple files supported</span></label>{images.length > 0 && <><div className="image-count">{images.length} image{images.length !== 1 ? 's' : ''} ready <button onClick={() => setImages([])}>Clear all</button></div><div className="image-grid">{images.map((image, index) => <div className="thumbnail" key={image.id}><img src={image.image} alt={image.name} /><button onClick={() => setImages(all => all.filter(item => item.id !== image.id))} aria-label="Remove image">×</button><span>{String(index + 1).padStart(2, '0')}</span></div>)}</div></>}</section></div>{error && <p className="error">{error}</p>}<div className="bottom-actions"><button className="secondary-button" onClick={onBack}>Cancel</button><button className="primary-button" onClick={createDataset}>Create dataset <span>→</span></button></div></section>
  </>
}
