import React from "react";
import NavBar from "../../components/navBar/NavBar";
import styled from "styled-components";
import ServiceBanner from "../../components/serviceBanner/ServiceBanner";
import ServiceLogo from "../../components/serviceLogo/ServiceLogo";
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <HomePage>
      {/* <NavBar /> */}
      <Container>
        <ServiceLogos>
          <Link to="/waterservices" style={linkStyle}>
            <ServiceLogo style={LogoStyle}></ServiceLogo>
          </Link>
          <Link to="/waterservices" style={linkStyle}>
            <ServiceLogo style={LogoStyle}></ServiceLogo>
          </Link>
          <Link to="/waterservices" style={linkStyle}>
            <ServiceLogo style={LogoStyle}></ServiceLogo>
          </Link>
          <Link to="/waterservices" style={linkStyle}>
            <ServiceLogo style={LogoStyle}></ServiceLogo>
          </Link>
        </ServiceLogos>
        <ServiceCarasoul>
          <ServiceBanner></ServiceBanner>
        </ServiceCarasoul>
      </Container>
    </HomePage>
  );
}

export default Home;
const HomePage = styled.div`
  height: calc(100% - 5.3rem);
  background: rgb(255, 255, 255);
  border: 1px solid black;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(205, 247, 255, 1) 65%,
    rgba(189, 244, 255, 1) 85%,
    rgba(169, 241, 255, 1) 100%
  );
`;

const Container = styled.div`
  @media (min-width: 35rem) {
    display: flex;
    width: 80%;
    max-width: 1150px;
    margin-top: 5rem;
  }
  margin: auto auto;
  margin-top: 3rem;
`;
const LogoStyle = {
  // maxHeight: "15rem",
  height: "100%",
  flexShrink: "1",
};

const ServiceLogos = styled.div`
  flex: 1;
  text-align: center;
  flex-wrap: wrap;
  display: flex;
  /* flex-grow: 1 1 0;
  flex-shrink: 1 1 0; */
  border: 1px solid black;
  /* justify-content: space-around;
  align-items: center; */
`;

const ServiceCarasoul = styled.div`
  flex: 1;
  display: flex;
  padding-top: 3rem;
`;

const linkStyle = {
  textdecoration: "none",
  maxHeight: "15rem",
  width: "auto",
  flexShrink: "1",
  flexGrow: "1",
  padding: "20px",
  // width: "300px",
  // height: "auto",
};
