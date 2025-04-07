import { GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import AddProduct from "./components/AddProduct"
import DeleteProduct from "./components/DeleteProduct"
import EditProduct from "./components/EditProduct"
import ProductManagement from "./components/ProductManagement"
import Navbar from "./components/NavBar"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Revenue from "./components/Revenue"
import Login from './components/Login'
import SellProduct from './components/SellProduct'
import { AuthProvider } from './components/AuthContext'

const clientId = "309023904476-uupr12jogp9t41s4cdc0bsl1ve6najuu.apps.googleusercontent.com"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode(token)
      setUser(decoded)
    }
  }, [])

  const isAuthenticated = !!user

  return (

    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductManagement />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/add-product" element={isAuthenticated ? <AddProduct /> : <Login setUser={setUser} />} />
            <Route path="/edit-product" element={isAuthenticated ? <EditProduct /> : <Login setUser={setUser} />} />
            <Route path="/delete-product" element={isAuthenticated ? <DeleteProduct /> : <Login setUser={setUser} />} />
            <Route path="/sell-product" element={isAuthenticated ? <SellProduct /> : <Login setUser={setUser} />} />
            <Route path="/revenue" element={isAuthenticated ? <Revenue /> : <Login setUser={setUser} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
