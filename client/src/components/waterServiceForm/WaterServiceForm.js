import React, { useState } from "react";
import styled from "styled-components";
// import Formik from "formik";
import bike from "../../images/waterService/bike.svg";
import car from "../../images/waterService/car.svg";

function WaterServiceForm() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    vehicleType: "bike",
    modal: "",
    address: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleEvent = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    // <Formik>
      <Form>
        <FormTitle>Booking Form</FormTitle>
        <Lable>
          Name{" "}
          <Input
            type="text"
            value={formValues.name}
            name="name"
            onChange={handleEvent}
          />
        </Lable>
        <Lable>
          Phone
          <Input
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleEvent}
          />
        </Lable>
        <Lable>
          Mail id{" "}
          <Input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleEvent}
          />
        </Lable>
        <Lable>
          Vehicle type
          <Select
            value={formValues.vehicleType}
            name="vehicleType"
            onChange={handleEvent}
          >
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </Select>
        </Lable>
        {formValues.vehicleType === "car" && (
          <Lable>
            Modal
            <Select
              value={formValues.modal}
              name="modal"
              onChange={handleEvent}
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
            </Select>
          </Lable>
        )}
        <Lable>
          Address{" "}
          <Input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleEvent}
          />
        </Lable>
        <Button>Book Now</Button>
      </Form>
    // </Formik>
  );
}

export default WaterServiceForm;

const Form = styled.form`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.p`
  color: #565656;
  font-weight: bolder;
  font-size: 2rem;
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
  #bike {
    color: red;
  }
`;

const Input = styled.input`
  margin-left: 1rem;
  font-size: 1.5rem;
  width: 50%;
  border: none;
  background: none;
  border-bottom: 2px solid black;
  :focus {
    outline: none;
  }
  @media (max-width: 35rem) {
    width: 70%;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Select = styled.select`
  margin-left: 1rem;
  font-size: 1.5rem;
  width: 50%;
  border: none;
  background: none;
  text-align: center;
  border-bottom: 2px solid black;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #565656;
  border: none;
  color: #d5d421;
  font-size: 2rem;
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
