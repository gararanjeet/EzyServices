import React, { useEffect } from "react";
import NavBar from "../../components/navBar/NavBar";
import styled from "styled-components";
import ServiceBanner from "../../components/serviceBanner/ServiceBanner";
import ServiceLogo from "../../components/serviceLogo/ServiceLogo";
import { Outlet, Link } from "react-router-dom";
import houseKeeping from "../../images/HouseKeeping/houseCleaningLogo.svg";
import houseKeepingBanner from "../../images/HouseKeeping/HouseCleaningbBanner.svg";

function Home() {
  return (
    <HomePage>
      {/* <NavBar /> */}
      <Container>
        <ServiceLogos>
          <Row className="row">
            <Link to="/waterservices" style={linkStyle}>
              <ServiceLogo style={LogoStyle}></ServiceLogo>
            </Link>
            <Link to="/houseCleaning" style={linkStyle}>
              <ServiceLogo style={LogoStyle} logo={houseKeeping}></ServiceLogo>
            </Link>
            <Link to="/waterservices" className="image-link" style={linkStyle}>
              <ServiceLogo style={LogoStyle}></ServiceLogo>
            </Link>
          </Row>
          <Row>
            <Link to="/waterservices" className="image-link" style={linkStyle}>
              <ServiceLogo style={LogoStyle}></ServiceLogo>
            </Link>
          </Row>
        </ServiceLogos>
        <ContainerRight>
          <ServiceCarasoul>
            <Banners>
              <Image>
                <ServiceBanner></ServiceBanner>
              </Image>
              <Image>
                <ServiceBanner banner={houseKeepingBanner}></ServiceBanner>
              </Image>
              <Image>
                <ServiceBanner></ServiceBanner>
              </Image>
            </Banners>
          </ServiceCarasoul>
        </ContainerRight>
      </Container>
    </HomePage>
  );
}

export default Home;
const HomePage = styled.div`
  height: calc(100% - 5.3rem);
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
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
    width: 90%;
    max-width: 1400px;
    margin-top: 9rem;
  }
  height: fit-content;
  width: 90%;
  margin: auto auto;
  margin-top: 3rem;
`;
const LogoStyle = {
  width: "100%",
  flexShrink: "1",
  // border: "1px solid black",
  "&hover": {
    border: "1px solid black",
  },
};

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 100%;
  align-items: center;
  flex-shrink: 1;
  aspect-ratio: 4/2;
  margin-bottom: 2.5em;
`;

const ServiceLogos = styled.div`
  flex: 1;
`;

const ContainerRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const ServiceCarasoul = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Banners = styled.div`
  width: 300%;
  position: relative;
  left: 0;
  display: flex;
  animation: 5s slider infinite;
  @keyframes slider {
    0% {
      left: 0;
    }
    45% {
      left: 0;
    }
    50% {
      left: -100%;
    }
    95% {
      left: -100%;
    }
    100% {
      left: -200%;
    }
  }
`;
const Image = styled.div`
  width: 33.3%;
`;

const linkStyle = {
  textdecoration: "none",
  // height: "100%",
  width: "30%",
};
