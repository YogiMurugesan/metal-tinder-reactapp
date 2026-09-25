// Reusable thumbnail grid. Takes a plain array of {id, image, name}
// objects and an onRemove callback — doesn't care WHERE the images
// came from or what happens after removal, so it works equally well
// showing wizard-staged images or an existing dataset's samples.
function ImageGrid({ images, onRemove }) {
  if (!images.length) return null;

  return (
    <>
      <div className="image-count">
        {images.length} image{images.length !== 1 ? 's' : ''} ready
        {onRemove && <button onClick={() => images.forEach(img => onRemove(img.id))}>Clear all</button>}
      </div>
      <div className="image-grid">
        {images.map((image, i) => (
          <div className="thumbnail" key={image.id}>
            <img src={image.image} alt={image.name} />
            {onRemove && (
              <button onClick={() => onRemove(image.id)} aria-label="Remove image">×</button>
            )}
            <span>{String(i + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageGrid;
