import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import {BsFillCartFill} from 'react-icons/bs'
import '../css/Navbar.css'

const Navbar = () => {
  const handleLogout = () => {
      localStorage.removeItem('token'); 
  }
  let location = useLocation();
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark color">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">PizzaSwift</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/" >Home</Link>
                </li> 
                <li className="nav-item mx-3">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                </li>
            </ul>
            
            <div className="right">
                {localStorage.getItem('token')  && <Link className={`cart-btn mx-3 ${location.pathname === "/cart" ? "active" : ""}`} to="/cart" ><BsFillCartFill/></Link>}
            </div>
            <div className="right">
                <button className='nav-link' style={{color:"white"}}> Create your pizza</button>
            </div>
            {!localStorage.getItem('token') ? <div className="left">
                <Link className="btn btn-outline-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                </div>: <Link onClick={handleLogout} className='btn btn-primary mx-3' to='/login'>Logout</Link> }
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar