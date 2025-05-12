import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from './context/AppContextProvider.tsx'
import { SnackbarProvider } from './context/SnackbarProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AppContextProvider>
  </StrictMode>
)
