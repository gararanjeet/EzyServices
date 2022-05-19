import React from "react";
import styled from "styled-components";

function ServiceProviderCard({ data, HandleComplete, Accepted, HandleAction }) {
  return (
    <Card>
      <Uid>{data.bookinguid}</Uid>
      <Container>
        <Details>
          <Name>{data.name}</Name>
          <Phone>{data.phone}</Phone>
          <Address>{data.address}</Address>
        </Details>
        <TimeSlot>
          <Date>{data.serviceDate.slice(0, 10)}</Date>
          <Slot>{data.slot}</Slot>
        </TimeSlot>
      </Container>
      <Decision>
        {Accepted ? (
          <Completed onClick={() => HandleComplete(data)}>Completed</Completed>
        ) : HandleAction ? (
          <>
            <Green onClick={() => HandleAction(data, "ACCEPTED")}>Accept</Green>
            <Red onClick={() => HandleAction(data, "REJECTED")}>Reject</Red>
          </>
        ) : null}
      </Decision>
    </Card>
  );
}

export default ServiceProviderCard;

const Card = styled.div`
  width: min(100%, 800px);
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #d1d1d1;
  box-shadow: 0 0 1.5rem #858585;

  /* border: 1px solid black; */
  padding: 1rem;
`;

const Uid = styled.p`
  font-size: 1.2rem;
  font-weight: bolder;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
`;
const Details = styled.div`
  height: 100%;
  flex: 1;
  /* border: 1px solid black; */
`;
const Bookingid = styled.p`
  font-size: 1.3rem;
  font-weight: bolder;
`;
const TimeSlot = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Name = styled.p`
  font-size: 1.3rem;
  font-weight: bolder;
  margin-bottom: 0.3rem;
`;
const Phone = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
`;
const Address = styled.p`
  font-size: 1.2rem;
`;

const Date = styled.p``;
const Slot = styled.p``;
const Decision = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Completed = styled.button`
  background-color: #5aa469;
  border: none;
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 1.5rem #5aa469;
  }
`;

const Green = styled.button`
  background-color: #5aa469;
  border: none;
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  margin-right: 1rem;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 0.5rem #5aa469;
  }
`;
const Red = styled.button`
  background-color: #f19292;
  border: none;
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 0.5rem #f19292;
  }
`;
