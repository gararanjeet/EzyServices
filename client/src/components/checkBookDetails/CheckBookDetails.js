import React, { useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import Notify from "../modals/Notify";
import BookingDetails from "../modals/BookingDetails";
const DetailsForm = styled.div`
  flex: 1;
  text-align: center;
  color: #565656;
`;

const Heading = styled.h1`
  /* padding: 1em; */
  text-align: left;
  text-decoration: underline;
`;

function CheckBookDetails() {
  const [booking_uid, setBooking_uid] = useState();
  const [cookie] = useCookies();
  const { id, token } = cookie;
  const [details, setDetails] = useState();
  const [popup, setpopup] = useState(false);
  const [notify, setNotify] = useState(false);
  const HandleSubmit = (e) => {
    e.preventDefault();
    fetchDetails();
  };

  const fetchDetails = async () => {
    const result = await axios
      .get("/Booking/singleBookingDetails", {
        headers: { token: `Barear ${token}` },
        params: { booking_uid, id },
      })
      .catch((err) => {
        alert("error occurecd");
        console.log(err);
      });
    if (result.data.length === 0) setNotify(true);
    if (result.data.length === 1) {
      setDetails(result.data);
      setpopup(true);
    }
  };

  return (
    <>
      <Form>
        <FormTitle>Booking Details</FormTitle>
        <Lable>Enter Ezy Booking number</Lable>
        <Input
          type="text"
          onChange={(e) => {
            setBooking_uid(e.target.value);
          }}
        />
        <Button onClick={(e) => HandleSubmit(e)}>View Details</Button>
      </Form>
      <Modal isOpen={notify} style={ModalStyle}>
        <Notify
          text={`No Booking with this boooking uid`}
          type="failed"
        ></Notify>
      </Modal>
      <Modal
        isOpen={popup}
        style={ModalStyle}
        onRequestClose={() => setpopup(false)}
      >
        <BookingDetails data={details} open={setpopup}></BookingDetails>
      </Modal>
    </>
  );
}

export default CheckBookDetails;

const Form = styled.form`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`;

const FormTitle = styled.p`
  color: #565656;
  font-weight: bolder;
  font-size: 2.5rem;
  /* text-decoration: underline; */
  padding: 0 5px 3px;
  border-bottom: 0.4rem solid #565656;
  margin-bottom: 3rem;
`;

const Lable = styled.div`
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #565656;
`;

const Input = styled.input`
  margin-left: 1rem;
  font-size: 1.5rem;
  width: 60%;
  border: none;
  background: #c1c1c1;
  padding: 0.5em;
  margin-bottom: 2rem;
  text-align: center;
  :focus {
    outline: none;
  }
  @media (max-width: 35rem) {
    width: 70%;
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
