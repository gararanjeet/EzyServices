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
  }, [refresh]);

  return (
    <AllBooking>
      <Title>My Bookings</Title>
      <Container>
        {data.length > 0 ? (
          data.map((booking) => (
            <BookingCard
              info={booking}
              key={booking._id}
              refresh={setRefresh}
            ></BookingCard>
          ))
        ) : (
          <Empty>No bookings Done</Empty>
        )}
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
  /* margin-top: 2rem; */
  width: min(90%, 1400px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem;
`;

const Empty = styled.p`
  font-size: 7rem;
  color: lightgray;
  font-weight: bolder;
  margin-top: 6rem;
`;

export default AllBookings;
