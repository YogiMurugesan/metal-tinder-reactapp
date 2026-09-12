export default function Progress({ value }) {
  return <div className="progress"><span style={{ width: `${value * 100}%` }} /></div>
}
