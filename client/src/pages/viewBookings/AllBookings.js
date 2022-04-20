import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookingCard from "../../components/bookingCard/BookingCard";
import axios from "../../components/axios";

function AllBookings() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("called");
    const fetchBookings = async () => {
      const bookings = await axios
        .get("/waterServicing/bookingDetails")
        .catch((err) => console.log(err));
      setData(bookings.data);
    };
    fetchBookings();
  }, []);

  return (
    <AllBooking>
      <Container>
        {data.map((bookings) => (
          <BookingCard info={bookings} key={bookings.booking_uid}></BookingCard>
        ))}
      </Container>
    </AllBooking>
  );
}

const AllBooking = styled.div`
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
  }
  height: fit-content;
  width: 90%;
  margin: auto auto;
  margin-top: 3rem;
  width: 90%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
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
  }
`;

export default AllBookings;
