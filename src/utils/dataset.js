export const STORE = 'metal-tinder-datasets-v1'

export const loadDatasets = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || []
  } catch {
    return []
  }
}

export const createId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`

export const fileToDataUrl = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(file)
})

export const createSample = async file => ({
  id: createId(),
  name: file.name,
  image: await fileToDataUrl(file),
  status: 'pending',
  language: 'en',
  notes: '',
  transcript: '',
  audio: null,
  duration: 0,
})

export const statusLabel = status => ({ complete: 'Complete', recording: 'Recording' }[status] || 'Pending')
