import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'
import AddProduct from './pages/AddProduct'
import Sidebar from './components/SidebarNav'
import EditProduct from './pages/EditProduct'
import Orders from './pages/Orders'
import AddOrder from './pages/AddOrder'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Restricted from './components/Restricted'
import Profile from './pages/Profile'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <PrivateRoute >
            <Dashboard />
          </PrivateRoute>}
        />
        <Route path="/dashboard" element={
          <PrivateRoute >
            <Dashboard />
          </PrivateRoute>}
        />
        <Route path="/products" element={
          <PrivateRoute >
            <Products />
          </PrivateRoute>}
        />
        <Route path="/products/add" element={
          <PrivateRoute >
            <AddProduct />
          </PrivateRoute>}
        />
        <Route path="/products/:id" element={
          <PrivateRoute >
            <EditProduct />
          </PrivateRoute>}
        />
        <Route path="/orders" element={
          <PrivateRoute >
            <Orders />
          </PrivateRoute>}
        />
        <Route path="/orders/add" element={
          <PrivateRoute >
            <AddOrder />
          </PrivateRoute>}
        />
        <Route path="/settings" element={
          <PrivateRoute >
            <Settings />
          </PrivateRoute>}
        />
        <Route path="/profile" element={
          <PrivateRoute >
            <Profile />
          </PrivateRoute>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/restricted" element={<Restricted />} />
      </Routes>
    </>
  );
}

export default App
