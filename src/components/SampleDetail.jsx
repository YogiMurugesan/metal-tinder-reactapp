import { useRef, useState } from 'react'
import Header from './Header.jsx'
import { statusLabel } from '../utils/dataset.js'

export default function SampleDetail({ dataset, sampleId, onBack, onUpdate }) {
  const original = dataset.samples.find(sample => sample.id === sampleId)
  const [sample, setSample] = useState(original)
  const [recording, setRecording] = useState(false)
  const recorder = useRef(null)
  const chunks = useRef([])
  const audioRef = useRef(null)
  const save = () => onUpdate({ ...dataset, samples: dataset.samples.map(item => item.id === sample.id ? sample : item) })
  const record = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      chunks.current = []
      mediaRecorder.ondataavailable = event => chunks.current.push(event.data)
      mediaRecorder.onstop = () => {
        const reader = new FileReader()
        reader.onload = () => { setSample(current => ({ ...current, audio: reader.result, status: 'complete' })); stream.getTracks().forEach(track => track.stop()) }
        reader.readAsDataURL(new Blob(chunks.current, { type: mediaRecorder.mimeType || 'audio/webm' }))
      }
      recorder.current = mediaRecorder
      mediaRecorder.start()
      setRecording(true)
    } catch { alert('Microphone access is required to make a recording.') }
  }
  const stop = () => { recorder.current?.stop(); setRecording(false) }
  const remove = () => { if (confirm('Remove this sample?')) { onUpdate({ ...dataset, samples: dataset.samples.filter(item => item.id !== sample.id) }); onBack() } }
  return <>
    <Header title="Sample details" back={onBack} action={<button className="text-button" onClick={() => { save(); onBack() }}>Save</button>} />
    <section className="page sample-page"><img className="sample-image" src={sample.image} alt={sample.name} /><div className="sample-heading"><div><p className="eyebrow">SAMPLE</p><h2>{sample.name}</h2></div><span className={`badge ${sample.status}`}>{statusLabel(sample.status)}</span></div><section className="panel"><h3>🎙 Recording</h3>{sample.audio ? <div className="audio-row"><button className="play" onClick={() => audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause()}>▶</button><audio controls ref={audioRef} src={sample.audio} /><button className="secondary-button" onClick={recording ? stop : record}>{recording ? 'Stop recording' : 'Re-record'}</button></div> : <div className="record-empty"><span>◉</span><p>No audio recorded yet</p><button className={`record-button ${recording ? 'recording' : ''}`} onClick={recording ? stop : record}>{recording ? '■ Stop recording' : '● Start recording'}</button></div>}</section><section className="panel"><h3>Transcript</h3><p>Review or edit the spoken description.</p><textarea className="transcript" value={sample.transcript || ''} onChange={event => setSample(current => ({ ...current, transcript: event.target.value }))} placeholder="Spoken description text..." /></section><section className="panel"><h3>Metadata</h3><label>Language<select value={sample.language || 'en'} onChange={event => setSample(current => ({ ...current, language: event.target.value }))}><option value="en">English</option><option value="ta">Tamil</option><option value="hi">Hindi</option><option value="ml">Malayalam</option></select></label><label>Notes<textarea value={sample.notes || ''} onChange={event => setSample(current => ({ ...current, notes: event.target.value }))} placeholder="Optional notes about this sample" /></label></section><button className="outline-danger full" onClick={remove}>Remove sample</button></section>
  </>
}
