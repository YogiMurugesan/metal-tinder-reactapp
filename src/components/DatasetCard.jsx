import Progress from './Progress.jsx';

// One dataset card in the dashboard list. Takes the dataset plus a
// few callback props (open/rename/delete) so IT doesn't need to know
// HOW those actions work — it just reports "the user clicked this."
function DatasetCard({ dataset, onOpen, onRename, onDelete }) {
  const total = dataset.samples.length;
  const done = dataset.samples.filter(s => s.status === 'complete').length;

  return (
    <article className="dataset-card" onClick={() => onOpen(dataset.id)}>
      <div className="dataset-icon">▣</div>
      <div className="dataset-copy">
        <h3>{dataset.name}</h3>
        <p>{done} of {total} annotated · {dataset.category || 'Industrial'}</p>
        <Progress value={total ? done / total : 0} />
      </div>
      <div className="card-menu" onClick={e => e.stopPropagation()}>
        <button
          className="icon-button"
          aria-label="Dataset actions"
          onClick={() => {
            const result = prompt('Rename dataset', dataset.name);
            if (result?.trim()) onRename(dataset.id, result.trim());
          }}
        >•••</button>
        <button className="delete-link" onClick={() => onDelete(dataset.id)}>Delete</button>
      </div>
    </article>
  );
}

export default DatasetCard;
