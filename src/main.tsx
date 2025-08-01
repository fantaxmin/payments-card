import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PaymentsProvider } from './context/PaymentsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PaymentsProvider>
      <App />
    </PaymentsProvider>
  </StrictMode>,
)
