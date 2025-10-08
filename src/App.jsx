import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Orders from './pages/Orders'
import AddOrder from './pages/AddOrder'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Restricted from './components/Restricted'
import Profile from './pages/Profile'
import PageLayout from './layout/PageLayout'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <PrivateRoute >
            <PageLayout>
              <Dashboard />
            </PageLayout>

          </PrivateRoute>}
        />
        <Route path="/dashboard" element={
          <PrivateRoute >
             <PageLayout>
              <Dashboard />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/products" element={
          <PrivateRoute >
             <PageLayout>
              <Products />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/products/add" element={
          <PrivateRoute >
            <PageLayout>
              <AddProduct />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/products/:id" element={
          <PrivateRoute >
            <PageLayout>
              <EditProduct />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/orders" element={
          <PrivateRoute >
            <PageLayout>
              <Orders />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/orders/add" element={
          <PrivateRoute >
            <PageLayout>
              <AddOrder />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/settings" element={
          <PrivateRoute >
            <PageLayout>
              <Settings />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/profile" element={
          <PrivateRoute >
            <PageLayout>
              <Profile />
            </PageLayout>
          </PrivateRoute>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/restricted" element={<Restricted />} />
      </Routes>
    </>
  );
}

export default App
