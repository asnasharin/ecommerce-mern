import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
import { ShoppingCart } from "@mui/icons-material"
import ProfileModal from './ProfileModal'

function Header() {
  return (
    <div className='header_navmenu'>
        <ul>
            <li>
                <Link to="/home" className="nav_link" style={{ textDecoration: "none"}}>Home</Link>
            </li>
            <li>
                <Link to="/product" className="nav_link" style={{ textDecoration: "none"}}>Product</Link>
            </li>
            <li>
                <Link to="/contact" className="nav_link" style={{ textDecoration: "none"}}>Contact</Link>
            </li>
            <li>
                <Link to="/about" className="nav_link" style={{ textDecoration: "none"}}>About</Link>
            </li>
        </ul>
        <span className='left_section'>
            <Link 
            to="/cart" 
            style={{ color: "black", textDecoration: "none"}}>
            <ShoppingCart className='cart_icon'/>
            </Link>
            <span>
            <ProfileModal />
            </span>
        </span>
    </div>
  )
}

export default Header