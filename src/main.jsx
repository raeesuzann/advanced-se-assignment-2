import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// The main entry point of the React application, where the App component is rendered inside a StrictMode wrapper for highlighting potential issues in the application. 
// The createRoot function from React DOM is used to create a root for rendering the App component into the DOM element with the id 'root'.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
