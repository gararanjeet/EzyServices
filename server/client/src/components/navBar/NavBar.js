import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logo from "../../images/Logo.svg";
import menu from "../../images/nav/hamberger.svg";
import close from "../../images/nav/close.png";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import SignupModal from "../modals/SignupModal";
import LoginModal from "../modals/LoginModal";
import { useCookies } from "react-cookie";
import userLogo from "../../images/OwnerHome/user.svg";

Modal.setAppElement("#portal");

function NavBar() {
  const [hidden, setHidden] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [LoginPopup, setLoginPopup] = useState(false);
  const [SignupPopup, setSignupPopup] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const { logedin, user, serviceProvider, manager } = cookie;
  // const [homePath, setHomePath] = useState("/");

  console.log({ logedin, user, serviceProvider, manager });

  const deleteCookies = () => {
    removeCookie("id");
    removeCookie("user_name");
    removeCookie("type");
    removeCookie("accessToken");
    removeCookie("role");
    removeCookie("logedin");
    removeCookie("user");
    removeCookie("serviceProvider");
    removeCookie("manager");
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
          <Link
            to={
              serviceProvider === "true"
                ? "/acceptedrequests"
                : manager === "true"
                ? "/owner"
                : "/"
            }
          >
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
              {user === "true" && (
                <Link to="/" style={linkStyle}>
                  <NavItem>Home</NavItem>
                </Link>
              )}

              {(user === "true" || logedin === "false" || !logedin) && (
                <Link to="/contact" style={linkStyle}>
                  <NavItem>Contact Us</NavItem>
                </Link>
              )}
              {user === "true" && (
                <Link to="/AllBookings" style={linkStyle}>
                  <NavItem>My Bookings</NavItem>
                </Link>
              )}
              {serviceProvider === "true" && (
                <>
                  <Link to="/acceptedRequests" style={linkStyle}>
                    <NavItem>Accepted</NavItem>
                  </Link>
                  <Link to="/pendingRequests" style={linkStyle}>
                    <NavItem>Pending</NavItem>
                  </Link>
                  <Link to="/completedRequests" style={linkStyle}>
                    <NavItem>Completed</NavItem>
                  </Link>
                </>
              )}
              {manager === "true" && (
                <>
                  <Link to="/bookingManagement" style={linkStyle}>
                    {/* <NavIcon src={userLogo} alt="logo" /> */}
                    <NavItem>
                      <p>Booking</p> Management
                    </NavItem>
                  </Link>
                  <Link to="/userManagement" style={linkStyle}>
                    <NavItem>
                      <p>User</p> Management
                    </NavItem>
                  </Link>
                </>
              )}
              {logedin === "true" && (
                <Link to="" style={linkStyle}>
                  <NavItem onClick={deleteCookies}>Logout</NavItem>
                </Link>
              )}
              {(logedin === "false" || !logedin) && (
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
  text-align: left;
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

const NavIcon = styled.img`
  height: 2.5rem;
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
  display: "flex",
  alignItems: "center",
  // background: "#d5d421",
  ":hover": {
    color: "#565656",
  },
};
