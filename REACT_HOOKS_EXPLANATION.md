# React Hooks - Updated Project

This is now a single React application with one `package.json` and one `src` folder.

## Hooks added

### useEffect
Used for side effects after rendering. In the authentication page it updates the browser title when the user changes between Login and Sign Up and restores the title during cleanup.

### useCallback
Used to memoize a function. The form input handler can be reused between renders instead of creating a new function every time.

### useMemo
Used to memoize a calculated value. The login-form validity is derived from the email and password values and is recalculated only when those dependencies change.

### useContext
Used to share authentication state across components without passing props through every level. `AuthContext.jsx` provides `user`, `isAuthenticated`, `login`, and `logout`.

## Interview explanation

> I used React Hooks to improve the authentication module. `useEffect` handles side effects and cleanup, `useCallback` memoizes event-handler functions, `useMemo` memoizes derived values, and `useContext` shares authentication state without prop drilling.

## Project structure

The ZIP contains one React application:

```text
project/
├── package.json
├── src/
│   ├── auth/
│   │   ├── AuthContext.jsx
│   │   └── AuthPage.jsx
│   └── ...
├── public/
└── ...
```

There is no second React application nested inside the project.
