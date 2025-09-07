import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'
import AddProduct from './pages/AddProduct'
import Sidebar from './components/sidebar'
import EditProduct from './pages/EditProduct'
import Orders from './pages/Orders'
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
        <Route path="/products/:id" element={<EditProduct />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      
    </>

  );
}

export default App
