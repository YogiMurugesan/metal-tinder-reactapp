// Reusable for ANY multi-step flow, not just this one.
//
// steps:        [{ id: 'details', label: 'Dataset details' }, ...]
// currentIndex: which step is active right now (0, 1, 2...)
// maxReached:   the furthest step the user has validated their way to
//               (lets you click BACK to a finished step, but not skip
//               AHEAD to one you haven't earned yet)
// onStepClick:  called with the index when a clickable step is clicked
function StepIndicator({ steps, currentIndex, maxReached, onStepClick }) {
  return (
    <div className="steps">
      {steps.map((step, index) => {
        const clickable = index <= maxReached;
        const state = index === currentIndex ? 'active' : index < currentIndex ? 'done' : 'upcoming';
        return (
          <span key={step.id} className="step-group">
            <b
              className={`step ${state} ${clickable ? 'clickable' : ''}`}
              onClick={() => clickable && onStepClick(index)}
            >
              {String(index + 1).padStart(2, '0')} <span>{step.label}</span>
            </b>
            {index < steps.length - 1 && <i>›</i>}
          </span>
        );
      })}
    </div>
  );
}

export default StepIndicator;
