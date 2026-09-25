import { useEffect, useState } from "react";

function UseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect executed");

    document.title = `Count: ${count}`;

    return () => {
      console.log("useEffect cleanup");
    };
  }, [count]);

  return (
    <section className="card">
      <h2>useEffect</h2>

      <p>
        <strong>Count:</strong> {count}
      </p>

      <button onClick={() => setCount((value) => value + 1)}>
        Increase Count
      </button>

      <p className="hint">
        Open the browser console and change the count.
      </p>
    </section>
  );
}

export default UseEffect;