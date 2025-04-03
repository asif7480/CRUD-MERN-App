import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FeedbackContextProvider } from './contexts/FeedbackContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeedbackContextProvider>
      <App />
    </FeedbackContextProvider>
  </StrictMode>,
)
