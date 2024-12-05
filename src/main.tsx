import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from './config/auth';
import App from './App';
import './index.css';
import './styles/map.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);
