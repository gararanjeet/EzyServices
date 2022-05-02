import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookingCard from "../../components/bookingCard/BookingCard";
import axios from "../../components/axios";
import { useCookies } from "react-cookie";

function AllBookings() {
  const [data, setData] = useState([]);
  const [cookie] = useCookies();
  const [refresh, setRefresh] = useState(0);

  const fetchBookings = async () => {
    const { token } = cookie;
    const { id } = cookie;
    const bookings = await axios
      .get("/Booking/list_user", {
        headers: { token: `Bearer ${token}` },
        params: { id },
      })
      .catch((err) => console.log(err));
    setData(bookings.data);
    console.log(bookings.data);
  };
  useEffect(() => {
    fetchBookings();
    console.log("changed");
  }, [refresh]);

  return (
    <AllBooking>
      <Title>All your Bookings</Title>
      <Container>
        {data.map((bookings) => (
          <BookingCard
            info={bookings}
            key={bookings.booking_uid}
            refresh={setRefresh}
          ></BookingCard>
        ))}
      </Container>
    </AllBooking>
  );
}

const AllBooking = styled.div`
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

const Title = styled.h1`
  padding-top: 2rem;
  text-align: center;
  font-size: 3rem;
  color: #565656;
  text-transform: capitalize;
`;

const Container = styled.div`
  width: 90%;
  margin: auto auto;
  margin-top: 3rem;
  width: min(90%, 1400px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  /* @media (min-width: 35rem) {
    height: fit-content;
    width: 90%;
    margin: auto auto;
    margin-top: 3rem;
    width: min(90%, 1400px);
    max-width: 1400px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    border: 1px solid black;
    flex-wrap: wrap;
  }
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media only screen and (min-width: 768px) {
    margin-top: 9rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  @media only screen and (min-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  } */
`;

export default AllBookings;
