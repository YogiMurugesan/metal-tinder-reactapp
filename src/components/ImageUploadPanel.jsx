import { makeSample } from '../utils/helpers.js';

// This component does ONE job: let the user pick image files, convert
// them into sample objects, and hand them to whoever's using it via
// onPick(). It does NOT hold state and does NOT render a grid — that's
// what makes it reusable in different places that each want to do
// something different with the result (stage them locally in the
// wizard, vs. add them straight into an existing dataset on Overview).
function ImageUploadPanel({ onPick, title = 'Import images', subtitle = 'Add one or more images from your device.' }) {
  const pick = async event => {
    const files = [...event.target.files];
    if (!files.length) return;
    const newSamples = await Promise.all(files.map(makeSample));
    onPick(newSamples);
    event.target.value = ''; // reset so picking the same file again still fires onChange
  };

  return (
    <div className="image-upload-panel">
      <h3>▧ {title}</h3>
      <p>{subtitle}</p>
      <label className="dropzone">
        <input type="file" accept="image/*" multiple onChange={pick} />
        <strong>Choose images</strong>
        <span>JPG, PNG, or WebP · multiple files supported</span>
      </label>
    </div>
  );
}

export default ImageUploadPanel;
