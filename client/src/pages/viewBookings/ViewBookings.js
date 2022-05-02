import { React, useState } from "react";
import ServiceLogo from "../../components/serviceLogo/ServiceLogo";
import CheckBookDetails from "../../components/checkBookDetails/CheckBookDetails";
import logo from "../../images/bookingLogo.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ViewBookings() {
  const [showBookings, setShowBookings] = useState(false);
  return (
    <BookingDetailsPage>
      <Container>
        <ContainerLeft>
          <ServiceLogo style={logoStyle} logo={logo}></ServiceLogo>
          <Link to="/allBookings">
            <Button>All Bookings</Button>
          </Link>
        </ContainerLeft>
        <CheckBookDetails></CheckBookDetails>
      </Container>
    </BookingDetailsPage>
  );
}

export default ViewBookings;

const BookingDetailsPage = styled.div`
  height: calc(100% - 5.2rem);
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
  @media (min-width: 35rem) {
    display: flex;
    align-items: center;
    width: 80%;
    max-width: 1400px;
    margin: atuto atuto;
    padding-top: 12rem;
  }
  margin: auto auto;
  /* border: 1px solid black; */
`;

const ContainerLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (maxwidth: 35rem) {
    margin-bottom: 3rem;
  }
`;

const Button = styled.button`
  background-color: #565656;
  border: none;
  color: #d5d421;
  font-size: 2rem;
  font-weight: bolder;
  padding: 0.5em 1em;
  border-radius: 200px;
  margin-top: 1em;
  :hover {
    cursor: pointer;
    background-color: #d5d421;
    color: #565656;
  }
`;

const logoStyle = {
  flex: "1",
  width: "50%",
  "@media (max-width: 35rem)": {
    width: "60%",
  },
};
