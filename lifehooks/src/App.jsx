import UseEffect from "./hooks/UseEffect";
import UseContext from "./hooks/UseContext";
import UseMemo from "./hooks/UseMemo";
import UseCallback from "./hooks/UseCallback";

function App() {
  return (
    <main className="container">
      <h1>React Hooks Practice</h1>

      <p className="subtitle">
        Learning React Hooks One by One
      </p>

      <UseEffect />

      <UseContext />

      <UseMemo />

      <UseCallback />
    </main>
  );
}

export default App;