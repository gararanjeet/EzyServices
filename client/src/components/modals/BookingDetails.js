import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import { useCookies } from "react-cookie";
import Rate from "../starRating/StarRating";
import { format } from "date-fns";

function BookingDetails({ data, open, assign, setRefresh, HandleDelete }) {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [serviceProvider, setServiceProvider] = useState([]);
  const [phone, setPhone] = useState("");
  const [cookie] = useCookies();
  const [rating, setRating] = useState(0);
  const [popup, setPopup] = useState(false);

  const SelectProvider = (id) => {
    try {
      console.log(id);
      let provider = serviceProviders.filter((obj) => obj._id === id);
      setServiceProvider(provider[0]);
      setPhone(provider[0].phone);
    } catch {
      setPhone("");
      setServiceProvider([]);
    }
  };

  const rateService = async () => {
    try {
      const result = await axios.post(
        "/Booking/rate",
        {
          id: data._id,
          rating,
        },
        { headers: { token: `Barear ${cookie.token}` } }
      );
      data.rating = rating;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data.rating === undefined && rating > 0) {
      setPopup(true);
      rateService();
      setTimeout(() => setPopup(false), 2000);
    }
  }, [rating]);

  // const name = data.service;
  const fetchData = async () => {
    const result = await axios.get("/ServiceProvider/list", {
      headers: { token: `Barear ${cookie.token}` },
      params: { service: data.service },
    });
    console.log(result, "service provider");
    setServiceProviders(result.data);
  };

  const onSubmit = async () => {
    const booking_id = data._id;
    const serviceProvider_id = serviceProvider._id;
    if (!serviceProvider_id) alert("Please select service Provider");
    else {
      await axios
        .post(
          "ServiceProvider/assign",
          {
            booking_id,
            serviceProvider_id,
          },
          {
            headers: {
              token: `Barear ${cookie.token}`,
            },
          }
        )
        .catch((err) => {
          alert("error occured");
        });
      setRefresh((count) => count + 1);
      open(false);
    }
  };

  useEffect(() => {
    if (assign) fetchData();
  }, [assign]);
  console.log(assign);
  return (
    <Container>
      <Title>{assign ? "Job Card" : "Booking Details"}</Title>
      <Row>
        <Key>Booking Id :</Key>
        <Value> {data.bookingUid}</Value>
      </Row>
      <Row>
        <Key>Name :</Key>
        <Value>{data.name}</Value>
      </Row>
      <Row>
        <Key>Phone :</Key>
        <Value>{data.phone}</Value>
      </Row>
      <Row>
        <Key>Mail :</Key>
        <Value>{data.email}</Value>
      </Row>
      <Row>
        <Key>Slot :</Key>
        <Value>{data.slot}</Value>
      </Row>
      <Row>
        <Key>Date :</Key>
        <Value>{format(new Date(data.serviceDate), "dd-MM-yy")}</Value>
      </Row>
      <Row>
        <Key>Address :</Key>
        <Value>{data.address}</Value>
      </Row>
      <Row>
        <Key>Status :</Key>
        <Value>{data.status}</Value>
      </Row>
      <Row>
        <Key>Service :</Key>
        <Value>{data.service}</Value>
      </Row>
      <Row>
        <Key>Sub service :</Key>
        <Value>{data.subService}</Value>
      </Row>
      <Row>
        <Key>Price :</Key>
        <Value>{data.price}</Value>
      </Row>
      {!assign && (
        <Row>
          <Key>Assigned to :</Key>
          <Value>{data.assignedName}</Value>
        </Row>
      )}
      {assign && (
        <>
          <Row>
            <Key>Service Provide:</Key>
            <Value>
              <Select onChange={(e) => SelectProvider(e.target.value)}>
                <option>Select</option>
                {serviceProviders.map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.userName}
                  </option>
                ))}
              </Select>
            </Value>
          </Row>
          {phone !== "" && (
            <>
              <Row>
                <Key>Phone</Key>
                <Value>
                  <Input value={phone} readOnly />
                </Value>
              </Row>
            </>
          )}
          <Button onClick={onSubmit}>Assign</Button>
        </>
      )}
      {HandleDelete &&
        ["PENDING", "AWAITING", "ACCEPTED", "REJECTED"].includes(
          data.status
        ) && <Button onClick={(e) => HandleDelete(e)}>Cancel</Button>}
      {data.status.toLowerCase() === "completed" && (
        <>
          {popup ? (
            <Popup>Thanks for u r rating!!!</Popup>
          ) : (
            <>
              {data.rating || rating ? (
                <Key className="center-align">Rating!!!</Key>
              ) : (
                <Key className="center-align">Rate Us!!!</Key>
              )}
              <Rate rating={data.rating || rating} onRating={setRating}></Rate>
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default BookingDetails;

const Container = styled.div`
  text-align: center;
  color: #565656;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  /* font-weight: bolder; */
`;

const Key = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  flex: 0.75;
  padding-right: 2rem;
  text-align: right;
  &.center-align {
    text-align: center;
  }
`;

const Value = styled.p`
  font-size: 1.2rem;
  flex: 1;
  flex-wrap: wrap;
  text-align: left;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const Select = styled.select`
  font-size: 1.2rem;
  width: 100%;
  background-color: #868686;
  border: none;
  border-bottom: 2px solid black;
`;

const Input = styled.input`
  font-size: 1.2rem;
  width: 100%;
  background-color: #868686;
  border: none;
  border-bottom: 2px solid black;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  text-transform: capitalize;
  background-color: #858585;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  cursor: pointer;
  :hover {
    background-color: #565656;
    color: white;
  }
`;

const Popup = styled.p`
  height: 4rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  line-height: 4rem;
`;
