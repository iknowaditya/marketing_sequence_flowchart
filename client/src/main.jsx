import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FlowProvider } from './context/FlowContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FlowProvider>
          <App />
        </FlowProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
