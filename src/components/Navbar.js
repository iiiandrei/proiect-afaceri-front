import { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch } from 'react-redux';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

export const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const logoutUser = async (e) => {
    setConfirmLogout(true)
  }

  return (
    <>
    <CModal visible={confirmLogout} onClose={() => setConfirmLogout(false)}>
        <CModalHeader onClose={() => setConfirmLogout(false)}>
          <CModalTitle>Are you sure?!</CModalTitle>
        </CModalHeader>
        {
          <CModalBody>You are about to log out. Are you sure?</CModalBody>
        }
        <CModalFooter>
          <button onClick={() => {setConfirmLogout(false)}} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={() => {
              setConfirmLogout(false);
              dispatch({ type: 'set', authToken: null });
              dispatch({ type: 'set', refreshToken: null });
          }} className="btn btn-ok">
              Yes, I'm sure
          </button>
        </CModalFooter>
      </CModal>
    <nav>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/all-announcements">All Announcements</NavLink>
        </li>
        <li>
          <NavLink to="/my-announcements">My Announcements</NavLink>
        </li>
        <li onClick={(e) => logoutUser(e)}>
          <a>Logout</a>
        </li>
      </ul>
    </nav>
    </>
  );
};