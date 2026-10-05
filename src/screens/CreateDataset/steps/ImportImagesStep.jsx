import ImageUploadPanel from '../../../components/ImageUploadPanel.jsx';
import ImageGrid from '../../../components/ImageGrid.jsx';

// Step 02: a dedicated, full-width review of everything staged so far.
// Reuses the exact same ImageUploadPanel + ImageGrid as Step 01 —
// this is the payoff of splitting them out: zero duplicated logic.
function ImportImagesStep({ images, onPickImages, onRemoveImage }) {
  return (
    <section className="panel image-panel full-width">
      <ImageUploadPanel title="Import more images" subtitle="Review everything you've added, or import more." onPick={onPickImages} />
      {images.length === 0 ? (
        <div className="empty mini">
          <p>No images added yet — go back to step 1 or add some here.</p>
        </div>
      ) : (
        <ImageGrid images={images} onRemove={onRemoveImage} />
      )}
    </section>
  );
}

export default ImportImagesStep;
