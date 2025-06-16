import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CheckAuth from './components/CheckAuth.jsx'
import Tickets from './pages/Tickets.jsx'
import TicketDetailsPage from './pages/Ticket.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/Admin.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CreateTicket from './pages/CreateTicket.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/tickets"
              element={
                <CheckAuth protectedRoute={true}>
                  <Tickets />
                </CheckAuth>
              }
            />
            <Route
              path="/tickets/:id"
              element={
                <CheckAuth protectedRoute={true}>
                  <TicketDetailsPage />
                </CheckAuth>
              }
            />
            <Route
              path="/create"
              element={
                <CheckAuth protectedRoute={true}>
                  <CreateTicket />
                </CheckAuth>
              }
            />
            <Route
              path="/login"
              element={
                <CheckAuth protectedRoute={false}>
                  <Login />
                </CheckAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <CheckAuth protectedRoute={false}>
                  <Signup />
                </CheckAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <CheckAuth protectedRoute={true}>
                  <Admin />
                </CheckAuth>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
