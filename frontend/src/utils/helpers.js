// The "key" under which everything is saved in the browser's localStorage
export const STORE = 'metal-tinder-datasets-v1';

export const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || [];
  } catch {
    return [];
  }
};

export const uid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

export const toDataUrl = file =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export const formatTime = seconds =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const statusLabel = status =>
  status === 'complete' ? 'Complete' : status === 'recording' ? 'Recording' : 'Pending';

// NEW: one shared way to turn a picked File into a "sample" object.
// Previously this exact shape was duplicated in 3 different places
// (Create, Overview's add-images, and now every wizard step) —
// pulling it out here means there's only one place to fix if the
// sample shape ever needs to change.
export const makeSample = async file => ({
  id: uid(),
  name: file.name,
  image: await toDataUrl(file),
  status: 'pending',
  language: 'en',
  notes: '',
  transcript: '',
  audio: null,
  duration: 0,
});
