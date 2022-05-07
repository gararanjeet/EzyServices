import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import { useCookies } from "react-cookie";

function BookingDetails({ data, open, assign, setRefresh }) {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [serviceProvider, setServiceProvider] = useState([]);
  const [phone, setPhone] = useState("");
  const [cookie] = useCookies();

  const SelectProvider = (id) => {
    try {
      let provider = serviceProviders.filter((obj) => obj.id == id);
      setServiceProvider(provider[0]);
      setPhone(provider[0].phone);
    } catch {
      setPhone("");
      setServiceProvider([]);
    }
  };

  // const name = data.service;
  const fetchData = async ({ setServiceProviders }) => {
    const result = await axios.get("/ServiceProvider/list", {
      headers: { token: `Barear ${cookie.token}` },
      params: { service: data.service },
    });
    setServiceProviders(result.data);
  };

  const onSubmit = async () => {
    const booking_id = data.id;
    const serviceProvider_id = serviceProvider.id;
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
    if (assign) fetchData({ setServiceProviders });
  }, [assign]);

  data = data[0];
  console.log(data);
  return (
    <Container>
      <Title>{assign ? "Job Card" : "Booking Details"}</Title>
      <Row>
        <Key>Booking Id :</Key>
        <Value> {data.booking_uid}</Value>
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
        <Value>{data.mail}</Value>
      </Row>
      <Row>
        <Key>Slot :</Key>
        <Value>{data.slot}</Value>
      </Row>
      <Row>
        <Key>Date :</Key>
        <Value>{data.date}</Value>
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
        <Value>{data.sub_service}</Value>
      </Row>
      {!assign && (
        <Row>
          <Key>Assigned to :</Key>
          <Value>{data.assigned_name}</Value>
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
                  <option key={index} value={user.id}>
                    {user.user_name}
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
  flex: 1;
  padding-right: 2rem;
  text-align: right;
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
`;
