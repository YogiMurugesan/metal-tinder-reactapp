import { useState } from 'react';
import Header from '../components/Header.jsx';
import Progress from '../components/Progress.jsx';
import StatCard from '../components/StatCard.jsx';
import { makeSample, statusLabel } from '../utils/helpers.js';

function Overview({ dataset, onBack, onUpdate, onDelete, onOpenSample }) {
  const [filter, setFilter] = useState('all');

  const total = dataset.samples.length;
  const done = dataset.samples.filter(s => s.status === 'complete').length;
  const visible = dataset.samples.filter(s => filter === 'all' || s.status === filter);

  const add = async event => {
    const files = [...event.target.files];
    const newSamples = await Promise.all(files.map(makeSample));
    onUpdate({ ...dataset, samples: [...dataset.samples, ...newSamples] });
    event.target.value = '';
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `${dataset.name.replace(/\s+/g, '_')}.json`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <Header title={dataset.name} back={onBack} action={<button className="text-button" onClick={exportData}>Export</button>} />
      <section className="page overview-page">
        <div className="overview-hero">
          <div>
            <p className="eyebrow">DATASET</p>
            <h2>{dataset.name}</h2>
            <p>{dataset.description || 'Ready for voice annotation.'}</p>
          </div>
          <button className="outline-danger" onClick={onDelete}>Delete dataset</button>
        </div>

        <section className="stats">
          <StatCard value={total} label="Images" />
          <StatCard value={done} label="Completed" />
          <StatCard value={total - done} label="To record" />
          <StatCard value={`${Math.round(total ? (done / total) * 100 : 0)}%`} label="Progress" />
        </section>
        <Progress value={total ? done / total : 0} />

        <div className="sample-toolbar">
          <div className="filters">
            {[['all', 'All'], ['pending', 'To record'], ['complete', 'Completed']].map(([value, label]) => (
              <button className={filter === value ? 'selected' : ''} key={value} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
          <label className="secondary-button add-images">
            ＋ Add images
            <input type="file" accept="image/*" multiple onChange={add} />
          </label>
        </div>

        <div className="samples">
          {visible.map((sample) => (
            <button className="sample-card" key={sample.id} onClick={() => onOpenSample(sample.id)}>
              <img src={sample.image} alt={sample.name} />
              <span className={`badge ${sample.status}`}>{statusLabel(sample.status)}</span>
              <div>
                <b>Sample {String(dataset.samples.indexOf(sample) + 1).padStart(2, '0')}</b>
                <small>{sample.name}</small>
              </div>
            </button>
          ))}
        </div>
        {!visible.length && <div className="empty mini"><p>No samples in this filter.</p></div>}
      </section>
    </>
  );
}

export default Overview;
