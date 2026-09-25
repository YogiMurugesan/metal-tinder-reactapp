import { useMemo, useState } from "react";

const users = [
  { id: 1, name: "Arun" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Vinitha" },
  { id: 4, name: "Karthik" },
];

function UseMemo() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");

    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section className="card">
      <h2>useMemo</h2>

      <input
        type="text"
        placeholder="Search user"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <h3>Filtered Users</h3>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <p>
        <strong>Count:</strong> {count}
      </p>

      <button onClick={() => setCount((value) => value + 1)}>
        Increase Count
      </button>

      <p className="hint">
        useMemo remembers a calculated value until its dependencies change.
      </p>
    </section>
  );
}

export default UseMemo;