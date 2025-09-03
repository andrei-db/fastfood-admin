import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
function App() {

  return (
    <div className='grow py-5 px-10'>
      <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/products" element={<Products />} />
      </Routes>
      </div>
  );
}

export default App
