import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';   // Tailwind
import './styles.css';  // existing custom styles for the dataset screens

// One shared QueryClient for the whole app — it's what actually holds
// TanStack Query's cache (so, e.g., a mutation's result can be reused
// or invalidated elsewhere without an extra network call).
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
