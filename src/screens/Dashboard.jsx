import Header from '../components/Header.jsx';
import DatasetCard from '../components/DatasetCard.jsx';

// The separate "dashboard overview" — lists every dataset.
// Notice how short this is now: it doesn't know HOW a dataset card
// looks anymore, it just loops and renders <DatasetCard />.
function Dashboard({ datasets, onCreate, onOpen, onRename, onDelete }) {
  return (
    <>
      <Header title="Datasets" action={<button className="text-button" onClick={onCreate}>+ New</button>} />
      <section className="page home-page">
        <div className="hero">
          <div>
            <p className="eyebrow">METAL TINDER</p>
            <h2>Capture better training data.</h2>
            <p>Pair your images with spoken descriptions, right from your phone.</p>
          </div>
          <button className="primary-button desktop-create" onClick={onCreate}>＋ Create dataset</button>
        </div>

        {datasets.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">▣</div>
            <h3>No datasets yet</h3>
            <p>Import images and record a description for every sample.</p>
            <button className="primary-button" onClick={onCreate}>Create dataset</button>
          </div>
        ) : (
          <div className="dataset-list">
            {datasets.map(dataset => (
              <DatasetCard
                key={dataset.id}
                dataset={dataset}
                onOpen={onOpen}
                onRename={onRename}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </section>
      <button className="fab" onClick={onCreate} aria-label="Create dataset">＋</button>
    </>
  );
}

export default Dashboard;
