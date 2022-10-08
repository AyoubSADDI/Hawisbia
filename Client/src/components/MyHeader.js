import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElement';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
            aaa
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/m/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/m/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/m/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;