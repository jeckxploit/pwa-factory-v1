import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App