import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import LandingPage from './pages/LandingPage'
import { ProtectedRoute, PublicRoute } from './routes/RoutesGuard'
import AddFunds from './pages/AddFunds'

// TODO: RESPONSIVE
// TODO: LOADERS

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/signup' element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path='/signin' element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          } />
          <Route path='/sendMoney' element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          } />
          <Route path='/addFunds' element={
            <ProtectedRoute>
              <AddFunds />
            </ProtectedRoute>
          }/>
        </Routes>
        {/* <Snackbar /> */}
      </BrowserRouter>
  )
}

export default App;