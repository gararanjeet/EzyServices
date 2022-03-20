import { React, useState } from "react";
import ServiceLogo from "../../components/serviceLogo/ServiceLogo";
import CheckBookDetails from "../../components/checkBookDetails/CheckBookDetails";
import logo from "../../images/bookingLogo.svg";
import styled from "styled-components";

function ViewBookings() {
  const [showBookings, setShowBookings] = useState(false);
  return (
    <BookingDetailsPage>
      {showBookings === false ? (
        <Container>
          <ContainerLeft>
            <ServiceLogo style={logoStyle} logo={logo}></ServiceLogo>
          </ContainerLeft>
          <CheckBookDetails></CheckBookDetails>
        </Container>
      ) : (
        <container></container>
      )}
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
    width: 80%;
    max-width: 1150px;
    margin: atuto atuto;
    padding-top: 7rem;
  }
  margin: auto auto;
  /* border: 1px solid black; */
`;

const ContainerLeft = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 35rem) {
    margin-bottom: 3rem;
  }
`;

const logoStyle = {
  flex: "1",
  width: "60%",
  "@media (max-width: 35rem)": {
    width: "60%",
  },
};
