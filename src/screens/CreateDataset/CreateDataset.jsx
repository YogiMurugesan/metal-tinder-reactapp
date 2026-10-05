import { useState } from 'react';
import Header from '../../components/Header.jsx';
import StepIndicator from '../../components/StepIndicator.jsx';
import DatasetDetailsStep from './steps/DatasetDetailsStep.jsx';
import ImportImagesStep from './steps/ImportImagesStep.jsx';
import StartAnnotatingStep from './steps/StartAnnotatingStep.jsx';
import { uid } from '../../utils/helpers.js';

const STEPS = [
  { id: 'details', label: 'Dataset details' },
  { id: 'images', label: 'Import images' },
  { id: 'annotate', label: 'Start annotating' },
];

// "Create Dataset" — the parent page. It owns ALL the wizard's state
// (form fields + staged images + which step is showing) and hands
// small slices of it down to whichever step is currently active.
// None of the 3 step components know about each other at all.
function CreateDataset({ onBack, onCreate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Industrial');
  const [language, setLanguage] = useState('English');
  const [images, setImages] = useState([]);

  const form = { name, setName, description, setDescription, category, setCategory, language, setLanguage };

  const addImages = newOnes => setImages(all => [...all, ...newOnes]);
  const removeImage = id => setImages(all => all.filter(img => img.id !== id));

  const goToStep = index => {
    setError('');
    setCurrentStep(index);
  };

  const next = () => {
    if (currentStep === 0 && name.trim().length < 3) {
      return setError('Use at least 3 characters for the dataset name.');
    }
    if (currentStep === 1 && images.length === 0) {
      return setError('Add at least one image before continuing.');
    }
    setError('');
    const nextIndex = currentStep + 1;
    setCurrentStep(nextIndex);
    setMaxReached(m => Math.max(m, nextIndex));
  };

  const back = () => (currentStep === 0 ? onBack() : goToStep(currentStep - 1));

  const finish = () => {
    onCreate({
      id: uid(),
      name: name.trim(),
      description,
      category,
      language,
      created: new Date().toISOString(),
      samples: images,
    });
  };

  return (
    <>
      <Header title="Create Dataset" back={back} />
      <section className="page create-page">
        <div className="intro">
          <div className="intro-icon">◈</div>
          <div>
            <h2>Build a new audio dataset</h2>
            <p>Set up your dataset details and import the images that will become recording samples.</p>
          </div>
        </div>

        <StepIndicator steps={STEPS} currentIndex={currentStep} maxReached={maxReached} onStepClick={goToStep} />

        {currentStep === 0 && (
          <DatasetDetailsStep form={form} images={images} onPickImages={addImages} onRemoveImage={removeImage} />
        )}
        {currentStep === 1 && (
          <ImportImagesStep images={images} onPickImages={addImages} onRemoveImage={removeImage} />
        )}
        {currentStep === 2 && (
          <StartAnnotatingStep form={form} images={images} />
        )}

        {error && <p className="error">{error}</p>}

        <div className="bottom-actions">
          <button className="secondary-button" onClick={back}>{currentStep === 0 ? 'Cancel' : 'Back'}</button>
          {currentStep < STEPS.length - 1 ? (
            <button className="primary-button" onClick={next}>Next <span>→</span></button>
          ) : (
            <button className="primary-button" onClick={finish}>Create dataset <span>→</span></button>
          )}
        </div>
      </section>
    </>
  );
}

export default CreateDataset;
