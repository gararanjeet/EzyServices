import React from "react";
import styled from "styled-components";
import { Table } from "../../components/table/BasicTable";

function AllBookings() {
  return (
    <AllBooking>
      <Container>
        <Table></Table>
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

export default AllBookings;
