import React from "react";
import styled from "styled-components";

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
  return (
    <Form>
      <FormTitle>Booking Details</FormTitle>
      <Lable>Enter Ezy Booking number</Lable>
      <Input type="text" />
      <Button>View Details</Button>
    </Form>
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
  font-size: 1rem;
  width: 50%;
  border: none;
  background: #c1c1c1;
  border-bottom: 2px solid black;
  padding: 0.5em;
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
  font-size: 1rem;
  font-weight: bolder;
  padding: 0.5em;
  border-radius: 200px;
  margin-top: 1em;
  :hover {
    cursor: pointer;
    background-color: #d5d421;
    color: #565656;
  }
`;
