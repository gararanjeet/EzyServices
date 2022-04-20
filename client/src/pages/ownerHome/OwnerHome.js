import React from "react";
import styled from "styled-components";
import ManagementCard from "../../components/managementCard/ManagementCard";
import userLogo from "../../images/OwnerHome/user.svg";
import bookingLogo from "../../images/OwnerHome/booking.svg";
import serviceLogo from "../../images/OwnerHome/service.svg";
import { Outlet, Link } from "react-router-dom";

function OwnerHome() {
  return (
    <OwnerPage>
      <Container>
        <Cards>
          <Link to="/userManagement" className="image-link" style={linkStyle}>
            <ManagementCard
              logo={userLogo}
              text="User Manangement"
            ></ManagementCard>
          </Link>
          <ManagementCard
            logo={bookingLogo}
            text="Booking Manangement"
          ></ManagementCard>
          <ManagementCard
            logo={serviceLogo}
            text="Service Manangement"
          ></ManagementCard>
        </Cards>
      </Container>
    </OwnerPage>
  );
}

export default OwnerHome;

const OwnerPage = styled.div`
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
    width: 90%;
    max-width: 1400px;
    /* margin-top: 9rem; */
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* border: 1px solid black; */
  width: 90%;
  margin: auto auto;
  /* margin-top: 3rem; */
`;

const Cards = styled.div`
  /* border: 1px solid black; */
  display: flex;
  width: min(100%, 70rem);
  justify-content: space-around;
  flex-wrap: wrap;
`;

const linkStyle = {
  textDecoration: "none",
  color: "#565656",
};
