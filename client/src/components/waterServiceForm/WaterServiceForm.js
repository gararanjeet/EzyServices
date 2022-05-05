import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../axios";
import { useCookies } from "react-cookie";
import Notify from "../modals/Notify";
import Modal from "react-modal";
import displayRazorpay from "../payment/payment";

const formatDate = (date) => {
  date = date.toISOString().replace(/T.*/, "").split("-").reverse().join("-");
  date = date.split("-").reverse();
  date = date.join("-");
  return date;
};

Modal.setAppElement("#portal");

function WaterServiceForm() {
  var minDate = new Date();
  var maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 7);

  minDate = formatDate(minDate);
  maxDate = formatDate(maxDate);

  // console.log(minDate, "hello", maxDate);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [showModel, setShowModel] = useState(false);
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [submitted, setsubmitted] = useState();
  const [success, setSuccess] = useState();
  const [failed, setFailed] = useState();
  const [bookingId, setBookingId] = useState();
  const [amount, setAmount] = useState();
  const [orderUrl, setOrderUrl] = useState("");

  const submit = (data) => {
    data.user_id = cookie.id;
    axios
      .post("/Booking/vehicleWaterService_create", data)
      .then((res) => {
        setSuccess(true);
        setBookingId(res.data.booking_id);
      })
      .catch((err) => {
        setBookingId("");
        console.log(err);
      });
  };

  const fetchPrice = async (model) => {
    if (model === "") setAmount();
    else {
      const result = await axios.get(`/Price/waterServicing/${model}`);
      setAmount(result.data.price);
      setOrderUrl(`/Payment/waterServicing/${model}`);
    }
  };

  useEffect(() => {
    const getSlots = (date) => {
      if (date === "" || !date) return;
      axios.post("/FreeSlot/waterServicing", { date: date }).then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });
    };
    getSlots(date);
  }, [date]);

  return (
    <>
      <Form
        onSubmit={handleSubmit((data) =>
          displayRazorpay(data, submit, orderUrl)
        )}
      >
        <FormTitle>Booking Form</FormTitle>
        <Small>{errors.name?.message}</Small>
        <Lable>
          Name{" "}
          <Input
            type={"text"}
            placeholder="Name"
            {...register("name", {
              required: "Name is Required !!!",
              minLength: {
                value: 3,
                message: "name should be atleast of 3 charecters",
              },
            })}
          />
        </Lable>
        <Small>{errors.phone?.message}</Small>
        <Lable>
          phone{" "}
          <Input
            type={"text"}
            placeholder="XXXXXXXXXX"
            {...register("phone", {
              required: "Phone number is Required !!!",
              minLength: {
                value: "10",
                message: "Phone no should be of 10 digit",
              },
              maxLength: {
                value: "10",
                message: "Phone no should be of 10 digit",
              },
            })}
          />
        </Lable>
        <Small>{errors.email?.message}</Small>
        <Lable>
          Email id{" "}
          <Input
            type={"email"}
            placeholder="example@mail.com"
            {...register("email", {
              required: "Email is Required !!!",
              pattern: {
                value: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
                message: "Please provide correct mail",
              },
            })}
          />
        </Lable>
        <Lable>
          Vehicle type{" "}
          <Select
            {...register("vehicle", {
              required: "Required !!!",
              onChange: (e) => {
                if (e.target.value === "car") setShowModel(true);
                else setShowModel(false);
                fetchPrice(e.target.value);
              },
            })}
          >
            <option value="">Select</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </Select>
        </Lable>
        {showModel && (
          <Lable>
            Modal{" "}
            <Select {...register("modal", { required: "Required !!!" })}>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
            </Select>
          </Lable>
        )}
        <Small>{errors.date?.message}</Small>
        <Lable>
          Date{" "}
          <Input
            {...register("date", {
              required: "Date is Required !!!",
              onChange: (e) => {
                setDate(e.target.value);
              },
            })}
            type="date"
            min={minDate}
            max={maxDate}
          />
        </Lable>
        <Small>{errors.slot?.message}</Small>
        <Lable>
          Time slot
          <Select {...register("slot", { required: "Required !!!" })}>
            <option>Select</option>
            {options.map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </Select>
        </Lable>
        <Small>{errors.address?.message}</Small>
        <Lable>
          Address{" "}
          <Input
            {...register("address", { required: "Address is required !!!" })}
          />
        </Lable>
        {amount && (
          <Lable>
            Amount
            <Input value={amount} readOnly />
          </Lable>
        )}
        <Button>Book Now</Button>
      </Form>
      <Modal
        isOpen={success}
        style={ModalStyle}
        onRequestClose={() => setSuccess(false)}
      >
        <Notify
          text={`Booking Success full     Your Booking id : ${bookingId}`}
          type="success"
        ></Notify>
      </Modal>
      <Modal
        isOpen={failed}
        style={ModalStyle}
        onRequestClose={() => setFailed(false)}
      >
        <Notify text={`Booking failed Try again later`} type="failed"></Notify>
      </Modal>
      {submitted === false && (
        <Notify text={`Booking failed Try again later`} type="failed"></Notify>
      )}
    </>
  );
}

export default WaterServiceForm;

const Form = styled.form`
  flex: 1.5;
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
