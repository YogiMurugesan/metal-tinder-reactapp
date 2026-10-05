// One metric box, e.g. "12 Images". Used 4 times in a row on the
// dataset overview page. Pulling this into its own component means
// each stat is defined once as data, not copy-pasted 4 times as JSX.
function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default StatCard;
