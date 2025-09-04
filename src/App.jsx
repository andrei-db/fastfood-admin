import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'
import AddProduct from './pages/AddProduct'
import Sidebar from './components/sidebar'

function App() {

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
      
    </>

  );
}

export default App
