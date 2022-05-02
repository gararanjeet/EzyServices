import React from "react";
import styled from "styled-components";

function ServiceProviderCard({ data, HandleClick }) {
  return (
    <Card onClick={() => HandleClick(data)}>
      <Details>
        <Name>{data.name}</Name>
        <Phone>{data.phone}</Phone>
        <Address>{data.address}</Address>
      </Details>
      <TimeSlot>
        <Date>{data.date.slice(0, 10)}</Date>
        <Slot>{data.slot}</Slot>
      </TimeSlot>
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
  display: flex;
  padding: 1rem;
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
