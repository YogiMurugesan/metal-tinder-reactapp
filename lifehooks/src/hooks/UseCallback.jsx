import { memo, useCallback, useState } from "react";

const Button = memo(function Button({ handleClick }) {
  console.log("Button rendered");

  return (
    <button onClick={handleClick}>
      Run Callback
    </button>
  );
});

function UseCallback() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Callback function executed");

    alert("Callback executed!");
  }, []);

  return (
    <section className="card">
      <h2>useCallback</h2>

      <p>
        <strong>Count:</strong> {count}
      </p>

      <button onClick={() => setCount((value) => value + 1)}>
        Increase Count
      </button>

      <br />
      <br />

      <Button handleClick={handleClick} />

      <p className="hint">
        useCallback remembers a function reference until its dependencies
        change.
      </p>
    </section>
  );
}

export default UseCallback;