// Step 03: a plain summary, no inputs. The actual dataset only gets
// created when the user confirms here — steps 1 & 2 just collect data
// into the wizard's local state, nothing is saved until this point.
function StartAnnotatingStep({ form, images }) {
  return (
    <section className="panel">
      <h3>🚀 Ready to start annotating</h3>
      <p>Review your dataset before creating it. You can always add more images later.</p>
      <div className="summary-list">
        <div><b>Name</b><span>{form.name || '—'}</span></div>
        <div><b>Category</b><span>{form.category}</span></div>
        <div><b>Language</b><span>{form.language}</span></div>
        <div><b>Description</b><span>{form.description || '—'}</span></div>
        <div><b>Images</b><span>{images.length} ready to record</span></div>
      </div>
    </section>
  );
}

export default StartAnnotatingStep;
