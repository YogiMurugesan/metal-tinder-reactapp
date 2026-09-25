Yes. Based on what you asked earlier, you want the **complete React Hooks project**, with **each hook in its own separate file**, and without the word `Example` in the filenames.

Use this exact structure:

```text
lifehooks/
│
├── package.json
├── index.html
├── vite.config.js
│
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    │
    └── hooks/
        ├── UseEffect.jsx
        ├── UseContext.jsx
        ├── UseMemo.jsx
        └── UseCallback.jsx
```

## 1. `src/hooks/UseEffect.jsx`

```jsx
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
```

---

## 2. `src/hooks/UseContext.jsx`

```jsx
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
```

---

## 3. `src/hooks/UseMemo.jsx`

```jsx
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
```

Notice that `users` is **outside** the component. That's intentional. It prevents a new array from being created on every render, so the `useMemo` demonstration actually makes sense.

---

## 4. `src/hooks/UseCallback.jsx`

```jsx
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
```

---

# 5. `src/App.jsx`

Now `App.jsx` only imports the separate hook components:

```jsx
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
```

---

# 6. `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# 7. `src/index.css`

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f6f8;
  color: #222;
}

.container {
  max-width: 850px;
  margin: auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.card {
  background: white;
  padding: 24px;
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card h2 {
  margin-top: 0;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 15px;
}

li {
  margin: 8px 0;
}

.hint {
  color: #666;
  font-size: 14px;
  margin-top: 15px;
}
```

---

# 8. `package.json`

```json
{
  "name": "lifehooks",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.14",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {}
}
```

---

# 9. `vite.config.js`

```jsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

---

# 10. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>React Hooks Practice</title>
  </head>

  <body>
    <div id="root"></div>

    <script
      type="module"
      src="/src/main.jsx"
    ></script>
  </body>
</html>
```

## Final project

```text
lifehooks/
│
├── package.json
├── index.html
├── vite.config.js
│
└── src/
    │
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    │
    └── hooks/
        │
        ├── UseEffect.jsx
        ├── UseContext.jsx
        ├── UseMemo.jsx
        └── UseCallback.jsx
```

This gives you **one hook per file**, which is much easier to study and later extend with:

```text
UseState.jsx
UseReducer.jsx
UseRef.jsx
UseLayoutEffect.jsx
UseImperativeHandle.jsx
UseId.jsx
UseTransition.jsx
UseDeferredValue.jsx
```

One important point: **the filenames `UseEffect.jsx`, `UseMemo.jsx`, etc. are just your component/file names.** The actual React APIs remain lowercase: `useEffect`, `useMemo`, `useContext`, and `useCallback`.


Absolutely. Let's use the **same four separate files** and learn each one properly in **English + Tanglish**.

We will go in this order:

1. `UseEffect.jsx`
2. `UseContext.jsx`
3. `UseMemo.jsx`
4. `UseCallback.jsx`

---

# 1. `UseEffect.jsx`

### Complete code

```jsx
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
```

## Line-by-line explanation

### Import

```jsx
import { useEffect, useState } from "react";
```

**English:**
We are importing two React Hooks:

* `useState` → stores changing data
* `useEffect` → performs side effects

**Tanglish:**
`useState` data-va store panna use pannuvom.
`useEffect` component render aana apram external work/side effect panna use pannuvom.

---

### State

```jsx
const [count, setCount] = useState(0);
```

**English:**
`count` stores the current value.

`setCount` changes the value.

Initial value is `0`.

**Tanglish:**

```text
count     → current value
setCount  → count-a change panna function
0         → starting value
```

Initially:

```text
count = 0
```

When we click the button:

```text
0 → 1 → 2 → 3 → ...
```

---

### useEffect

```jsx
useEffect(() => {
```

**English:**
This tells React:

> "After rendering, execute this code when the dependency changes."

**Tanglish:**
React component render pannina apram, specified condition satisfy aana indha code execute aagum.

---

### Console

```jsx
console.log("useEffect executed");
```

**English:**
This prints a message in the browser console.

**Tanglish:**
Browser-la `F12 → Console` open pannina message theriyum.

---

### Changing browser title

```jsx
document.title = `Count: ${count}`;
```

**English:**
This changes the browser tab title.

If:

```text
count = 0
```

the tab becomes:

```text
Count: 0
```

After clicking:

```text
Count: 1
```

**Tanglish:**
Browser tab title dynamic-aa change panrom.

This is a good example of a **side effect**.

---

### Cleanup

```jsx
return () => {
  console.log("useEffect cleanup");
};
```

**English:**
The function returned from `useEffect` is called the **cleanup function**.

Cleanup is used when something needs to be stopped or removed.

Examples:

* remove event listeners
* clear timers
* unsubscribe from subscriptions
* disconnect connections

**Tanglish:**
`useEffect`-la return panra function cleanup function.

Something start pannirundha, later adha stop/remove panna cleanup use pannuvom.

---

### Dependency array

```jsx
}, [count]);
```

This is very important.

`[count]` means:

> Run the effect when `count` changes.

**Tanglish:**

`count` change aana:

```text
useEffect
    ↓
execute
```

Example:

```text
count = 0
↓
count = 1
↓
useEffect runs

count = 2
↓
useEffect runs
```

### Remember this

```jsx
useEffect(() => {
  // code
});
```

Runs after every render.

```jsx
useEffect(() => {
  // code
}, []);
```

Runs after initial mount (with a development Strict Mode caveat).

```jsx
useEffect(() => {
  // code
}, [count]);
```

Runs when `count` changes.

---

# 2. `UseContext.jsx`

### Complete code

```jsx
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
```

## Why useContext?

Suppose we have:

```text
App
 ↓
Parent
 ↓
Child
 ↓
UserDetails
```

And `App` has:

```jsx
const user = {
  name: "Vinitha"
};
```

Without Context, we might pass:

```text
App
 ↓ props
Parent
 ↓ props
Child
 ↓ props
UserDetails
```

This is called **prop drilling**.

**Tanglish:**
Data direct-aa thevai illaadha components vazhiya pass pannitu poganum.

`useContext` helps avoid that.

---

### Create context

```jsx
const UserContext = createContext(null);
```

**English:**
We create a Context object.

**Tanglish:**
Shared data store/access panna oru Context create panrom.

---

### Provider

```jsx
<UserContext.Provider value={user}>
```

The `value` contains the data we want to share.

Here:

```jsx
const user = {
  name: "Vinitha",
  role: "React Learner",
  isLoggedIn: true,
};
```

So the Provider shares:

```text
name
role
isLoggedIn
```

---

### useContext

```jsx
const user = useContext(UserContext);
```

**English:**
This retrieves the current context value.

**Tanglish:**
`Provider` share pannina data-va `useContext()` use panni direct-aa eduthukkalam.

Then:

```jsx
user.name
user.role
user.isLoggedIn
```

---

### Important flow

```text
createContext()
      ↓
Provider
      ↓
value={user}
      ↓
useContext()
      ↓
UserDetails gets user
```

That's the main concept.

---

# 3. `UseMemo.jsx`

### Complete code

```jsx
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
        useMemo remembers a calculated value until its dependencies
        change.
      </p>
    </section>
  );
}

export default UseMemo;
```

## What is useMemo?

`useMemo` is used to **memoize a calculated value**.

**Tanglish:**
Oru calculation result expensive-aa irundha, every render-la again calculate panna vendam.

Already calculated result-a temporarily remember pannalam.

---

### Users

```jsx
const users = [
  { id: 1, name: "Arun" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Vinitha" },
  { id: 4, name: "Karthik" },
];
```

Our data.

---

### Search state

```jsx
const [search, setSearch] = useState("");
```

User search box-la type panra value `search`-la store aagum.

Example:

```text
search = ""
```

Then user types:

```text
vi
```

Now:

```text
search = "vi"
```

---

### useMemo

```jsx
const filteredUsers = useMemo(() => {
```

Inside it:

```jsx
return users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);
```

**English:**
It filters users according to the search text.

**Tanglish:**
Search value based on users filter panrom.

For example:

```text
search = "vi"
```

Result:

```text
Vinitha
```

---

### Dependency

```jsx
}, [search]);
```

This is extremely important.

It means:

> Recalculate the filtered result only when `search` changes.

**Tanglish:**

```text
search change
     ↓
filter again
```

But if some unrelated state changes:

```text
count changes
     ↓
filtered result doesn't need recalculation
```

That's the idea behind `useMemo`.

---

# 4. `UseCallback.jsx`

### Complete code

```jsx
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
        useCallback remembers a function reference until its
        dependencies change.
      </p>
    </section>
  );
}

export default UseCallback;
```

# What is useCallback?

This is one of the most confusing hooks initially.

`useCallback` memoizes a **function reference**.

**Tanglish:**

`useMemo` → value-a remember pannum.

`useCallback` → function-a remember pannum.

### Easy comparison

```text
useMemo
   ↓
remembers VALUE

useCallback
   ↓
remembers FUNCTION
```

---

### Our function

```jsx
const handleClick = useCallback(() => {
  console.log("Callback function executed");

  alert("Callback executed!");
}, []);
```

We are telling React:

> Keep the same function reference unless dependencies change.

Here:

```jsx
[]
```

means there are no dependencies.

---

# Why `memo` is used here?

```jsx
const Button = memo(function Button({ handleClick }) {
```

`memo` can prevent a child component from re-rendering when its props haven't changed.

Suppose:

```text
Parent
  |
  | handleClick
  ↓
Button
```

When the parent re-renders, normally a function defined inside the parent can get a new reference.

`useCallback` helps keep the same function reference.

Then `memo` can recognize:

```text
Previous handleClick
       =
New handleClick
```

and avoid an unnecessary child re-render.

**Tanglish:**

`useCallback` + `memo` combination dhaan inga important.

```text
useCallback
     ↓
same function reference
     ↓
React.memo
     ↓
child unnecessary render avoid panna help
```

---

# The 4 hooks — easy comparison

| Hook          | Main purpose                   | Remember                                        |
| ------------- | ------------------------------ | ----------------------------------------------- |
| `useEffect`   | Side effects / synchronization | **Do something after render/dependency change** |
| `useContext`  | Shared data                    | **Get shared data without prop drilling**       |
| `useMemo`     | Memoize calculated value       | **Remember a value**                            |
| `useCallback` | Memoize function reference     | **Remember a function**                         |

### One-line Tanglish memory trick

```text
useEffect   → side effect panna
useContext  → shared data edukkanum
useMemo     → calculated value remember panna
useCallback → function remember panna
```

---

# Your `App.jsx`

All four are now separate:

```jsx
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
```

So when you open your project, you can study them individually:

```text
src/hooks/UseEffect.jsx
        ↓
Learn useEffect

src/hooks/UseContext.jsx
        ↓
Learn useContext

src/hooks/UseMemo.jsx
        ↓
Learn useMemo

src/hooks/UseCallback.jsx
        ↓
Learn useCallback
```

**Study tip:** Don't just read the code. For each file, first predict **when it runs, what changes, and why the dependency array is there**, then run it and check the browser console. That's where these hooks really start making sense.
Yes! ✅ **Everything is correct.** 🎉

Your Vite development server started successfully:

```text
VITE v5.4.21 ready
Local: http://localhost:5173/
```

### Now open it

Open your browser and go to:

**[http://localhost:5173/](http://localhost:5173/)**

You should see your **React Hooks Practice** page with:

```text
React Hooks Practice

useEffect
useContext
useMemo
useCallback
```

### Important

Keep this CMD window running while you're using the application.

To stop the server later, press:

```text
Ctrl + C
```

### For learning

Once the page is open, start with:

**`UseEffect.jsx` → `useEffect`**

Try clicking **Increase Count** and observe:

1. The count changes.
2. The browser tab title changes.
3. Open **F12 → Console** and watch the `useEffect` messages.

That's the best way to understand what the code is actually doing.
Good 👍 Since you understand `useEffect`, I recommend we go next with **`useContext`**.

The learning order should be:

```text
1. useEffect      ✅
2. useContext     ← NEXT
3. useMemo
4. useCallback
```

## Next: `useContext`

### First understand the problem: Prop Drilling

Imagine:

```text
App
 ↓
Parent
 ↓
Child
 ↓
UserDetails
```

Suppose `App` has:

```jsx
const user = {
  name: "Vinitha",
  role: "React Learner"
};
```

But `UserDetails` needs this data.

Without Context, you may have to do:

```text
App
 ↓ user
Parent
 ↓ user
Child
 ↓ user
UserDetails
```

Even though `Parent` and `Child` don't actually need the user data.

This is called **prop drilling**.

### Tanglish

Oru data `App` component-la irukku.

But `UserDetails`-ku mattum andha data venum.

Middle-la irukkura components-ku data thevai illa.

Still:

```text
App → Parent → Child → UserDetails
```

props pass pannanum.

**Idhudhaan prop drilling.**

---

# `useContext` solves this

With Context:

```text
              UserContext
                   ↓
                  user
                   ↓
App ───────────────┼──────────────
                   ↓
              UserDetails
                   ↓
             useContext()
```

`UserDetails` can directly access the shared data.

---

## The three important things

When learning `useContext`, remember these three:

### 1. `createContext()`

```jsx
const UserContext = createContext(null);
```

Creates the Context.

### 2. `Provider`

```jsx
<UserContext.Provider value={user}>
```

Provides/shares the data.

### 3. `useContext()`

```jsx
const user = useContext(UserContext);
```

Gets the data.

### Easy memory

```text
createContext()
      ↓
create the context

Provider
      ↓
provide the data

useContext()
      ↓
consume/get the data
```

**Tanglish:**

```text
createContext → context create pannum

Provider → data share pannum

useContext → data eduthukkum
```

---

### Your `UseContext.jsx`

Open:

```text
src/hooks/UseContext.jsx
```

and we'll learn it **line by line**, just like we did for `useEffect`.

Start with this line:

```jsx
import { createContext, useContext } from "react";
```

The important question is:

**Why do we need both `createContext` and `useContext`?**

That's the first thing to understand before moving through the rest of the code.
Yes. 👍 Since you want to study later, I'll give you the **same complete style for all 3 remaining hooks**:

1. `useContext`
2. `useMemo`
3. `useCallback`

I'll keep the pattern the same: **what it is → why we need it → code → line-by-line explanation → flow → Tanglish memory trick → important points**.

---

# 2. useContext

## What is `useContext`?

`useContext` is used to **access shared data from a Context** without passing props through every intermediate component.

### Simple idea

Imagine:

```text
App
 ↓
Parent
 ↓
Child
 ↓
UserDetails
```

`App` has user information:

```jsx
const user = {
  name: "Vinitha",
  role: "React Learner"
};
```

But only `UserDetails` needs it.

Without Context:

```text
App
 ↓ props
Parent
 ↓ props
Child
 ↓ props
UserDetails
```

This is called **prop drilling**.

With Context:

```text
        Context
           ↓
App ────────────────
           ↓
      UserDetails
           ↓
     useContext()
```

`UserDetails` can directly access the shared data.

### Tanglish

`App`-la data irukku.

`UserDetails`-ku andha data venum.

Middle components-ku data thevai illa.

Still props pass panna vendiyirundha adhu **prop drilling**.

`useContext` use pannina shared data direct-aa access pannalam.

---

# Complete `UseContext.jsx`

```jsx
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
        useContext allows a component to access shared data
        without passing props through every component.
      </p>
    </section>
  );
}

export default UseContext;
```

---

## Line 1

```jsx
import { createContext, useContext } from "react";
```

We import two things.

### `createContext`

Creates a Context.

```text
createContext()
       ↓
creates Context
```

### `useContext`

Reads data from that Context.

```text
useContext()
      ↓
gets Context data
```

### Tanglish

```text
createContext → Context create panna

useContext → Context-la irukkura data edukka
```

---

## Creating the Context

```jsx
const UserContext = createContext(null);
```

Here:

```text
UserContext
```

is our Context object.

`null` is the initial/default value.

### Important

This doesn't contain the actual user yet.

We're only creating the **container/channel** through which data can be shared.

Think:

```text
UserContext
     ↓
shared data channel
```

---

# `UserDetails` component

```jsx
function UserDetails() {
```

This is the component that needs the user information.

---

## Getting the Context data

```jsx
const user = useContext(UserContext);
```

This is the most important line.

`useContext(UserContext)` asks React:

> "Give me the current value provided by `UserContext`."

So:

```text
Provider value
      ↓
useContext()
      ↓
user
```

Then we can do:

```jsx
user.name
user.role
user.isLoggedIn
```

---

## Displaying the name

```jsx
<p>
  <strong>Name:</strong> {user.name}
</p>
```

If:

```jsx
user.name = "Vinitha"
```

React displays:

```text
Name: Vinitha
```

---

## Displaying role

```jsx
<p>
  <strong>Role:</strong> {user.role}
</p>
```

Result:

```text
Role: React Learner
```

---

## Conditional rendering

```jsx
{user.isLoggedIn ? "Logged in" : "Logged out"}
```

This is the **ternary operator**.

If:

```text
isLoggedIn = true
```

result:

```text
Logged in
```

If:

```text
isLoggedIn = false
```

result:

```text
Logged out
```

---

# Creating the user

Inside `UseContext`:

```jsx
const user = {
  name: "Vinitha",
  role: "React Learner",
  isLoggedIn: true,
};
```

This is the data we want to share.

---

# Provider

Now the important part:

```jsx
<UserContext.Provider value={user}>
  <UserDetails />
</UserContext.Provider>
```

The Provider makes `user` available to components inside it.

```text
UserContext.Provider
        |
        | value = user
        ↓
   UserDetails
```

Then `UserDetails` does:

```jsx
useContext(UserContext)
```

and gets that value.

---

# Complete flow

Remember this:

```text
1. createContext()
       ↓
2. Create UserContext
       ↓
3. Provider
       ↓
4. value={user}
       ↓
5. UserDetails
       ↓
6. useContext(UserContext)
       ↓
7. Get user
```

### Memory trick

```text
create → provide → consume
```

**Tanglish:**

```text
createContext
→ context create

Provider
→ data provide

useContext
→ data consume
```

---

# When should you use useContext?

Common examples:

* logged-in user
* theme
* language
* authentication
* application settings
* shopping cart
* global preferences

For example:

```text
ThemeContext
AuthContext
LanguageContext
CartContext
```

---

# 3. useMemo

Now let's move to `useMemo`.

## What is `useMemo`?

`useMemo` is used to **memoize a calculated value**.

In simple words:

> Calculate something and remember the result until its dependencies change.

### Tanglish

Oru calculation repeated-aa nadakkudhu.

Every render-la same calculation again panna thevai illa.

So React calculated result-a remember panna `useMemo` use pannalam.

---

# Real-world example

Imagine:

```text
10,000 users
      ↓
search/filter
      ↓
expensive calculation
```

Every unrelated render-la filtering again panna waste.

`useMemo` can remember the previous result.

---

# Complete `UseMemo.jsx`

```jsx
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
```

---

## Import

```jsx
import { useMemo, useState } from "react";
```

We need:

```text
useState → store changing data
useMemo  → memoize calculated value
```

---

# Users array

```jsx
const users = [
  { id: 1, name: "Arun" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Vinitha" },
  { id: 4, name: "Karthik" },
];
```

This is our data.

Notice that it is **outside** the component.

That's intentional.

---

# Search state

```jsx
const [search, setSearch] = useState("");
```

Initially:

```text
search = ""
```

If user types:

```text
Vin
```

then:

```text
search = "Vin"
```

---

# Count state

```jsx
const [count, setCount] = useState(0);
```

This is unrelated to searching.

We use it to demonstrate why memoization can matter.

---

# useMemo

The most important part:

```jsx
const filteredUsers = useMemo(() => {
```

Inside:

```jsx
return users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);
```

We're filtering the users.

Suppose:

```text
search = "vi"
```

Then:

```text
Arun
Priya
Vinitha
Karthik
```

becomes:

```text
Vinitha
```

The result is stored in:

```text
filteredUsers
```

---

# Dependency array

```jsx
}, [search]);
```

This is extremely important.

It says:

> Recalculate the memoized value when `search` changes.

### Example

```text
search = ""
     ↓
calculate

search = "v"
     ↓
calculate again

search = "vi"
     ↓
calculate again
```

But:

```text
count changes
     ↓
search didn't change
     ↓
useMemo can reuse previous result
```

That's the basic idea.

---

# Why is `users` outside the component?

We wrote:

```jsx
const users = [...]
```

outside:

```jsx
function UseMemo() {
```

because otherwise every render would create a new array.

For example, this would be less useful for this demonstration:

```jsx
function UseMemo() {
  const users = [...]
}
```

Every render creates a new array.

So we keep the static data outside.

---

# Important: useMemo doesn't mean "always use it"

Don't use `useMemo` for every variable.

Use it when:

* calculation is expensive
* calculation doesn't need to happen on every render
* memoization provides a meaningful benefit

### Tanglish

`useMemo` optimization tool.

Simple calculation-ku ellam `useMemo` podanum-nu rule illa.

---

# Easy memory

```text
useMemo
   ↓
memoize
   ↓
VALUE
```

Remember:

> **useMemo → value**

---

# 4. useCallback

Now the final one.

## What is `useCallback`?

`useCallback` is used to **memoize a function reference**.

### Very important difference

```text
useMemo
   ↓
remembers a VALUE

useCallback
   ↓
remembers a FUNCTION
```

### Tanglish

```text
useMemo → value remember

useCallback → function remember
```

---

# Complete `UseCallback.jsx`

```jsx
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
```

---

# Import

```jsx
import { memo, useCallback, useState } from "react";
```

We use:

```text
memo
useCallback
useState
```

---

# Child component

```jsx
const Button = memo(function Button({ handleClick }) {
```

This creates a child component called `Button`.

It receives:

```text
handleClick
```

as a prop.

---

# Why `memo`?

```jsx
memo(...)
```

`memo` helps React skip a child re-render when its props haven't changed.

This becomes important with `useCallback`.

---

# The callback function

```jsx
const handleClick = useCallback(() => {
```

This is our function.

It does:

```jsx
console.log("Callback function executed");

alert("Callback executed!");
```

---

# Dependency array

```jsx
}, []);
```

Empty dependency array means React can keep the same function reference across renders, subject to React's normal lifecycle behavior.

So conceptually:

```text
render 1
   ↓
handleClick = function A

render 2
   ↓
handleClick = function A

render 3
   ↓
handleClick = function A
```

rather than creating a new function reference on each render.

---

# Parent → Child

We pass the function:

```jsx
<Button handleClick={handleClick} />
```

So:

```text
UseCallback
     |
     | handleClick
     ↓
   Button
```

---

# Why combine `useCallback` and `memo`?

Suppose the parent changes:

```text
count
```

The parent renders again.

Without `useCallback`, a function created inside the parent can get a new reference:

```text
old function ≠ new function
```

Then the child may see its prop as changed.

With:

```text
useCallback
+
memo
```

the function reference can stay stable when dependencies haven't changed, allowing `memo` to skip the child render.

### Tanglish

Parent render aagumbodhu child-ku same function-a pass panna useful.

```text
useCallback
      ↓
function reference stable
      ↓
memo
      ↓
child unnecessary render avoid panna help
```

---

# All 4 hooks — final comparison

| Hook          | What does it mainly do?        | Easy memory           |
| ------------- | ------------------------------ | --------------------- |
| `useEffect`   | Side effects / synchronization | **Do something**      |
| `useContext`  | Access shared context data     | **Get shared data**   |
| `useMemo`     | Memoize a calculated value     | **Remember value**    |
| `useCallback` | Memoize a function reference   | **Remember function** |

## Super-simple Tanglish version

```text
useEffect
→ render/dependency change aana side effect panna

useContext
→ shared data direct-aa access panna

useMemo
→ calculation result/value remember panna

useCallback
→ function reference remember panna
```

---

# The concepts you should be able to answer

After studying these four, make sure you can explain:

### `useEffect`

* What is a side effect?
* Why do we use `useEffect`?
* What is a dependency array?
* What does `[]` mean?
* What does `[count]` mean?
* What is cleanup?
* When does cleanup run?

### `useContext`

* What is Context?
* Why do we need it?
* What is prop drilling?
* What is `createContext()`?
* What is `Provider`?
* What does `value` do?
* What does `useContext()` do?

### `useMemo`

* What is memoization?
* What does `useMemo` return?
* Why do we use dependencies?
* What is an expensive calculation?
* Difference between normal calculation and memoized calculation?

### `useCallback`

* What does `useCallback` return?
* Why memoize a function?
* What is `React.memo`?
* Why are `useCallback` and `memo` often used together?
* Difference between `useMemo` and `useCallback`?

---

## The most important interview comparison

If someone asks:

**"What is the difference between `useMemo` and `useCallback`?"**

Answer:

> `useMemo` memoizes the **result/value of a calculation**, while `useCallback` memoizes the **function reference itself**.

Tanglish:

> **useMemo value-a remember pannum; useCallback function-a remember pannum.**

That one distinction is worth remembering very well.
