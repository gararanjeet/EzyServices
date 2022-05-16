import axios from "../axios";
import React, { useState } from "react";

import styled from "styled-components";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import BookingDetails from "../modals/BookingDetails";
import { format } from "date-fns";

function BookingCard({ info, refresh }) {
  const [cookie] = useCookies();
  const [popup, setpopup] = useState(false);
  const { bookingUid, slot, service, serviceDate, subService, status } = info;
  const bookingId = info._id;

  const HandleDelete = async () => {
    try {
      // console.log("clicked");
      await axios.delete("/Booking/delete", {
        headers: { token: `Barer ${cookie.token}` },
        data: { bookingId, id: cookie.id },
      });
      refresh((count) => count + 1);
    } catch (err) {
      console.log(err);
    }
    console.log("modified");
  };
  console.log(info);
  return (
    <Item>
      <Card
        onClick={(e) => {
          e.preventDefault();
          setpopup(true);
        }}
        className={
          status === "CANCELLED"
            ? "cancel"
            : status === "COMPLETED"
            ? "success"
            : "pending"
        }
      >
        <Title>{service}</Title>
        <Subtitle>{subService}</Subtitle>
        <Bookinguid>{bookingUid}</Bookinguid>
        <Slot>
          <span>{format(new Date(serviceDate), "dd-mm-yy")}</span>
          <span>{slot}</span>
        </Slot>
        <Status>{status}</Status>
      </Card>
      <Modal
        isOpen={popup}
        style={ModalStyle}
        onRequestClose={() => setpopup(false)}
      >
        <BookingDetails
          data={info}
          open={setpopup}
          HandleDelete={HandleDelete}
        ></BookingDetails>
      </Modal>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
    cursor: pointer;
  }
`;

const Title = styled.h2`
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const Bookinguid = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
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

const ModalStyle = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    textAlign: "center",
    position: "absolute",
    maxWidth: "500px",
    height: "fit-content",
    margin: "auto auto",
    border: "1px solid #ccc",
    background: "white",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "2rem",
    outline: "none",
    padding: "20px",
    transition: "1s easy",
  },
};

export default BookingCard;
