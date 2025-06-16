import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
    }
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
  return (
    <div className="navbar bg-base-200 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Ticket AI
        </Link>
      </div>
      {/* Hamburger for mobile */}
      <div className="flex-none lg:hidden">
        <button className="btn btn-square btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
      {/* Desktop menu */}
      <div className="flex-none gap-2 hidden lg:flex">
        {!token ? (
          <>
            <Link to="/signup" className="btn btn-sm">
              Signup
            </Link>
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
          </>
        ) : (
          <>
            <p>Hi, {user?.email}</p>
            {user && user?.role === "admin" ? (
              <Link to="/admin" className="btn btn-sm">
                Admin
              </Link>
            ) : null}
            <Link to="/create" className="btn btn-primary btn-sm">
              Create Ticket
            </Link>
            <Link to="/tickets" className="btn btn-ghost btn-sm">
              Tickets
            </Link>
            <button onClick={logout} className="btn btn-sm">
              Logout
            </button>
          </>
        )}
      </div>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 z-50 bg-base-200 rounded shadow-lg flex flex-col gap-2 p-4 w-48 lg:hidden">
          {!token ? (
            <>
              <Link to="/signup" className="btn btn-sm" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
              <Link to="/login" className="btn btn-sm" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm mb-2 max-w-[140px] truncate block" title={user?.email}>{user?.email}</span>
              {user && user?.role === "admin" ? (
                <Link to="/admin" className="btn btn-sm" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              ) : null}
              <Link to="/create" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                Create Ticket
              </Link>
              <Link to="/tickets" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>
                Tickets
              </Link>
              <button onClick={() => { setMenuOpen(false); logout(); }} className="btn btn-sm">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar