import ImageUploadPanel from '../../../components/ImageUploadPanel.jsx';
import ImageGrid from '../../../components/ImageGrid.jsx';

// --- Sub-component 1 of 2: the plain details form ---
function DatasetDetailsForm({ name, setName, description, setDescription, category, setCategory, language, setLanguage }) {
  return (
    <section className="panel">
      <h3>✎ Dataset details</h3>
      <p>Give your dataset a clear identity.</p>
      <label>Dataset name <em>*</em>
        <input value={name} maxLength="60" onChange={e => setName(e.target.value)} placeholder="e.g. Industrial Machine Sounds" />
      </label>
      <label>Description
        <textarea value={description} maxLength="240" onChange={e => setDescription(e.target.value)} placeholder="What is this dataset being created for?" />
      </label>
      <div className="two-col">
        <label>Category
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {['Industrial', 'Urban', 'Nature', 'Vehicles', 'Other'].map(x => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label>Language
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            {['English', 'Tamil', 'Hindi', 'Malayalam', 'Other'].map(x => <option key={x}>{x}</option>)}
          </select>
        </label>
      </div>
      <div className="metadata">
        <span>✓</span>
        <div><b>Keep metadata with samples</b><small>Store filename, language and recording status.</small></div>
      </div>
    </section>
  );
}

// --- Sub-component 2 of 2: image uploading, reusing the shared panel + grid ---
function ImageUploadingSection({ images, onPick, onRemove }) {
  return (
    <section className="panel image-panel">
      <ImageUploadPanel title="Upload images" subtitle="Add the images you'll be recording descriptions for." onPick={onPick} />
      <ImageGrid images={images} onRemove={onRemove} />
    </section>
  );
}

// --- Parent for this step: just lays the two sub-components side by side ---
function DatasetDetailsStep({ form, images, onPickImages, onRemoveImage }) {
  return (
    <div className="create-grid">
      <DatasetDetailsForm {...form} />
      <ImageUploadingSection images={images} onPick={onPickImages} onRemove={onRemoveImage} />
    </div>
  );
}

export default DatasetDetailsStep;
