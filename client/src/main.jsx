import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import Dashboard from './routes/Dashboard.jsx';
import PrivateRoom from './routes/PrivateRoom.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard/:name" element={<Dashboard/>} />
        <Route path="/chat/:id" element={<PrivateRoom/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
