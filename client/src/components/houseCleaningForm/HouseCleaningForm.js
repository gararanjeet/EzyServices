import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function HouseCleaningForm() {
  return (
    <>
      <Form>
        <FormTitle>Booking Form</FormTitle>
        <Lable>
          Name <Input type={"text"} />
        </Lable>
        <Lable>
          Phone <Input type={"text"} />
        </Lable>
        <Lable>
          Mail id <Input type={"text"} />
        </Lable>
        <Lable>
          Address <Input type={"text"} />
        </Lable>
        <Button>Get a Quote</Button>
      </Form>
    </>
  );
}

export default HouseCleaningForm;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 2.5em;
  /* border: 1px solid black; */
`;

const Input = styled.input`
  margin-left: 1rem;
  font-size: 1rem;
  width: 50%;
  border: none;
  background: none;
  border-bottom: 2px solid black;
  text-align: center;
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
  font-size: 1rem;
  width: 50%;
  border: none;
  background: none;
  text-align: center;
  border-bottom: 2px solid black;
  :focus {
    outline: none;
  }
`;

const Small = styled.small`
  color: red;
  text-align: left;
`;

const Button = styled.button`
  background-color: #565656;
  border: none;
  color: #d5d421;
  font-size: 1.5rem;
  font-weight: bolder;
  padding: 0.5em 1.5em;
  border-radius: 200px;
  margin-top: 1em;
  margin-bottom: 5rem;
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
