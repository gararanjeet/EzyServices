import React from "react";
import styled from "styled-components";

function BookingCard({ info }) {
  const {
    booking_uid,
    end,
    start,
    price,
    service,
    service_date,
    sub_service,
    status,
  } = info;
  console.log(status);
  return (
    <Item>
      <Card
        className={
          status === "withdrawn"
            ? "cancel"
            : status === "completed"
            ? "success"
            : "pending"
        }
      >
        <Title>{service}</Title>
        <Subtitle>{sub_service}</Subtitle>
        <Slot>
          <span>{service_date.slice(0, 10)}</span>
          <span>
            {start.slice(0, 5)} - {end.slice(0, 5)}
          </span>
        </Slot>
        <Status>{status}</Status>

        <Button
          className={
            (status === "completed" || status === "withdrawn") && "disabled"
          }
        >
          Cancel
        </Button>
      </Card>
    </Item>
  );
}
const Item = styled.div`
  display: inline-grid;
`;

const Card = styled.div`
  color: #565656;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem;
  text-align: center;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.cancel {
    background-color: #ffc6c6;
    box-shadow: 0 0 1rem #ffc6c6;
  }
  &.success {
    background-color: #96cfb9;
    box-shadow: 0 0 1rem #96cfb9;
  }
  &.pending {
    background-color: #a4d7e1;
  }
  :hover {
    transform: scale(1.03);
    transition: 0.2s ease-in-out;
  }
`;

const Title = styled.h2`
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const Subtitle = styled.h3`
  text-transform: capitalize;
  font-size: 1.2rem;
`;

const Slot = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  span {
    font-weight: bold;
  }
`;

const Status = styled.p`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0.5rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 1rem;
  background-color: #e5dec5; //for success
  font-size: 1.3rem;
  font-weight: bold;
  color: #565656;
  width: 100%;
  margin: 0.5rem;
  padding-top: 5px;
  padding-bottom: 5px;
  :hover {
    cursor: pointer;
  }
  &.disabled {
    background-color: #ad9c9c; //for cancel
    background-color: #87aaaa; //for pending
    color: rgba(256, 256, 256, 0.7);
    opacity: 0.5;
    cursor: auto;
  }
`;

export default BookingCard;
