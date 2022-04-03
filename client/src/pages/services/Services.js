// Modifications
//should try to render these components from json file
import React, { useEffect } from "react";
import NavBar from "../../components/navBar/NavBar";
import ServiceBanner from "../../components/serviceBanner/ServiceBanner";
import ServiceLogo from "../../components/serviceLogo/ServiceLogo";
import WaterServiceForm from "../../components/waterServiceForm/WaterServiceForm";
import styled from "styled-components";
import { useState } from "react";

function Services() {
  const [formVisible, setformVisible] = useState(false);
  const toggle = () => {
    setformVisible(!formVisible);
  };

  // useEffect(() => {
  //   const visible = window.localStorage.getItem("visible");
  //   setformVisible(JSON.parse(visible));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("visible", JSON.stringify(formVisible));
  // }, [formVisible]);

  return (
    <ServicesPage>
      {/* <NavBar /> */}
      <Container>
        <ContainerLeft>
          <ServiceLogo style={logoStyle}></ServiceLogo>
          {/* {!formVisible ? <Button onClick={toggle}>Book Now</Button> : null} */}
        </ContainerLeft>
        {/* {!formVisible ? <ServiceBanner></ServiceBanner> : <WaterServiceForm />} */}
        <WaterServiceForm></WaterServiceForm>
      </Container>
    </ServicesPage>
  );
}

export default Services;

const ServicesPage = styled.div`
  height: calc(100% - 5.3rem);
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(205, 247, 255, 1) 65%,
    rgba(189, 244, 255, 1) 85%,
    rgba(169, 241, 255, 1) 100%
  );
`;

const Container = styled.div`
  max-width: 1400px;
  @media (min-width: 35rem) {
    display: flex;
    margin: auto auto;
    padding-top: 10rem;
    width: 80%;
  }
  padding-top: 5rem;
`;

const logoStyle = {
  flex: "1",
  width: "70%",
};

const Button = styled.button`
  background-color: #565656;
  border: none;
  color: #d5d421;
  font-size: 2rem;
  font-weight: bolder;
  padding: 0.5em;
  border-radius: 200px;
  margin-top: 1em;
  :hover {
    cursor: pointer;
    background-color: #d5d421;
    color: #565656;
  }
`;

const ContainerLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -5rem;
  @media (max-width: 35rem) {
    margin-bottom: 3rem;
    padding: 3rem;
  }
`;
