import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const UserContext = React.createContext(null);

function Profile() {
  const user = useContext(UserContext);

  return (
    <section className="card">
      <h2>useContext</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.isLoggedIn ? "Logged in" : "Logged out"}</p>
    </section>
  );
}

const ActionButton = React.memo(function ActionButton({ onClick }) {
  console.log("ActionButton rendered");
  return <button onClick={onClick}>Run Callback</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Arun" },
    { id: 2, name: "Priya" },
    { id: 3, name: "Vinitha" },
    { id: 4, name: "Karthik" }
  ];

  // useEffect: side effect when count changes.
  useEffect(() => {
    console.log("useEffect: count =", count);
    document.title = `Count: ${count}`;

    return () => console.log("useEffect cleanup");
  }, [count]);

  // useMemo: memoize the filtered value.
  const filteredUsers = useMemo(() => {
    console.log("useMemo: filtering");
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // useCallback: memoize the function reference.
  const handleCallback = useCallback(() => {
    console.log("useCallback executed");
    alert("Callback executed. Check the console.");
  }, []);

  const user = {
    name: "Vinitha",
    role: "React Learner",
    isLoggedIn: true
  };

  return (
    <UserContext.Provider value={user}>
      <main className="container">
        <h1>React Hooks Practice</h1>
        <p className="subtitle">
          useEffect · useContext · useMemo · useCallback
        </p>

        <section className="card">
          <h2>useEffect</h2>
          <p>Count: {count}</p>
          <button onClick={() => setCount((value) => value + 1)}>
            Increase Count
          </button>
          <p className="hint">Open the browser console and change the count.</p>
        </section>

        <Profile />

        <section className="card">
          <h2>useMemo</h2>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users"
          />
          <ul>
            {filteredUsers.map((user) => <li key={user.id}>{user.name}</li>)}
          </ul>
          <p className="hint">
            Filtering is memoized based on users and search.
          </p>
        </section>

        <section className="card">
          <h2>useCallback</h2>
          <ActionButton onClick={handleCallback} />
          <p className="hint">
            The callback function reference is memoized.
          </p>
        </section>
      </main>
    </UserContext.Provider>
  );
}

export default App;
