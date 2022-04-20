import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logo from "../../images/Logo.svg";
import menu from "../../images/nav/hamberger.svg";
import close from "../../images/nav/close.png";
import { Link } from "react-router-dom";
// import Dropdown from "../dropdown/DropDown";
import Modal from "react-modal";
import SignupModal from "../modals/SignupModal";
import LoginModal from "../modals/LoginModal";
import { useCookies } from "react-cookie";
// import AuthContext from "../../context/AuthContext";

function NavBar() {
  const [hidden, setHidden] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [LoginPopup, setLoginPopup] = useState(false);
  const [SignupPopup, setSignupPopup] = useState(false);
  // const { loginStatus } = useContext(AuthContext);
  const [cookie, setCookie, removeCookie] = useCookies();

  const deleteCookies = () => {
    removeCookie("id");
    removeCookie("user_name");
    removeCookie("type");
    removeCookie("accessToken");
  };

  const toggle = () => {
    setHidden(!hidden);
  };

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });
  useEffect(() => {
    LoginPopup || SignupPopup
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [LoginPopup, SignupPopup]);

  return (
    <>
      <Nav>
        <NavContent>
          <Link to="/">
            {" "}
            <img
              src={logo}
              alt="logo"
              style={({ height: "3rem" }, { width: "10rem" })}
            />
          </Link>

          {width <= 560 &&
            (hidden ? (
              <HambergerMenu onClick={toggle} />
            ) : (
              <CloseMenu onClick={toggle} />
            ))}
          {(!hidden || width > 560) && (
            <NavItems>
              <Link to="/contact" style={linkStyle}>
                <NavItem>Contact Us</NavItem>
              </Link>
              {!cookie.id ? (
                <>
                  <Link to="" style={linkStyle}>
                    <NavItem onClick={() => setLoginPopup(true)}>
                      Log in
                    </NavItem>
                  </Link>
                  <Link to="" style={linkStyle}>
                    <NavItem onClick={() => setSignupPopup(true)}>
                      Sign Up
                    </NavItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/viewBookings" style={linkStyle}>
                    <NavItem>Booking Status</NavItem>
                  </Link>

                  <Link to="" style={linkStyle}>
                    <NavItem onClick={deleteCookies}>Logout</NavItem>
                  </Link>
                </>
              )}
            </NavItems>
          )}
        </NavContent>
      </Nav>
      <Modal
        isOpen={LoginPopup}
        style={ModalStyle}
        onRequestClose={() => setLoginPopup(false)}
      >
        <LoginModal Open={setLoginPopup} />
      </Modal>
      <Modal
        isOpen={SignupPopup}
        style={ModalStyle}
        onRequestClose={() => setSignupPopup(false)}
      >
        <SignupModal Open={setSignupPopup} />
      </Modal>
    </>
  );
}

export default NavBar;

const Nav = styled.div`
  width: 100%;
  background-color: #565656;
`;
const NavContent = styled.div`
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 0.6em 0;
  @media (min-width: 35rem) {
    display: flex;
  }
`;

const HambergerMenu = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 2rem;
  background: url(${menu});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 35rem) {
    display: block;
  }
`;
const CloseMenu = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  background: url(${close});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  :hover {
    cursor: pointer;
  }
`;

const NavItems = styled.div`
  @media (min-width: 35rem) {
    display: flex;
    align-items: center;
  }
`;

const NavItem = styled.div`
  text-align: center;
  font-size: 1.3rem;
  padding: 0.4em;
  color: white;
  margin: auto 0;
  border-radius: 0.4rem;
  :hover {
    background-color: #d5d421;
    color: #565656;
    cursor: pointer;
  }
  @media (max-width: 35rem) {
    margin-top: 1rem;
    z-index: 999;
    margin: auto 0;
  }
`;

const ModalStyle = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    maxWidth: "500px",
    height: "fit-content",
    margin: "auto auto",
    border: "1px solid #ccc",
    background: "#565656",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "2rem",
    outline: "none",
    padding: "20px",
    transition: "1s easy",
  },
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  // border: "1px solid black",
  height: "fit-content",
  width: "fit-content",
  marginRight: "0.5em",
  ":hover": {
    color: "#565656",
  },
};
