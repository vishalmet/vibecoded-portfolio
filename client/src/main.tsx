import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Cursor from "../src/components/cursor.jsx"
import { Analytics } from '@vercel/analytics/react' // Add this import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Cursor />
    <App />
    <Analytics /> 
  </StrictMode>,
)
