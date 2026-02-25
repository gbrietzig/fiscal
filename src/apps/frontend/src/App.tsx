import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SearchPage } from './pages/Search/SearchPage'
import { DeputyDashboard } from './pages/Dashboard/DeputyDashboard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/deputy/:id" element={<DeputyDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
