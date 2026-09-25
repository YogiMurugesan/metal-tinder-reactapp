import { createContext, useContext } from "react";

const UserContext = createContext(null);

function UserDetails() {
  const user = useContext(UserContext);

  return (
    <div>
      <h3>User Details</h3>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {user.isLoggedIn ? "Logged in" : "Logged out"}
      </p>
    </div>
  );
}

function UseContext() {
  const user = {
    name: "Vinitha",
    role: "React Learner",
    isLoggedIn: true,
  };

  return (
    <section className="card">
      <h2>useContext</h2>

      <UserContext.Provider value={user}>
        <UserDetails />
      </UserContext.Provider>

      <p className="hint">
        useContext allows a component to access shared data without
        passing props through every component.
      </p>
    </section>
  );
}

export default UseContext;