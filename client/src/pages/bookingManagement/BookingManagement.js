import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "../../components/table/BasicTable";
import axios from "../../components/axios";
import { COLUMNS } from "./columns";
import { date } from "yup";

const DateFormat = (data) => {
  data.forEach((element) => {
    element.date = element.date.slice(0, 10);
    console.log(element);
  });
  return data;
};

function BookingManagement() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/Admin/Bookings");
      const formatedData = DateFormat(result.data);
      setData(formatedData);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <BookingManagementPage>
      <Container>
        <AccessBar>
          <Label>
            Date
            <Input type="Date" />
          </Label>
          <Label>
            Status
            <Select>
              <option value={"pending"}>Pending</option>
              <option value={"completed"}>completed</option>
              <option value={"pending"}></option>
            </Select>
          </Label>
          <Button>Filter</Button>
        </AccessBar>

        <TableContainer>
          <Table COLUMNS={COLUMNS} DATA={data}></Table>
        </TableContainer>
      </Container>
    </BookingManagementPage>
  );
}

export default BookingManagement;

const BookingManagementPage = styled.div`
  height: calc(100% - 5.3rem);
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(205, 247, 255, 1) 65%,
    rgba(189, 244, 255, 1) 85%,
    rgba(169, 241, 255, 1) 100%
  );
`;

const Container = styled.div`
  @media (min-width: 35rem) {
    width: 90%;
    max-width: 1400px;
  }
  height: 100%;
  width: 90%;
  margin: auto auto;
`;

const AccessBar = styled.div`
  display: flex;
  height: fit-content;
  margin-top: 4rem;
  margin-bottom: 2rem;
  justify-content: right;
  /* :first-child {
    margin-left: auto;
  } */
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const Input = styled.input`
  margin: 0rem 0.5rem;
  margin-right: 2rem;
  font-size: 1%.2rem;
  height: 2rem;
`;

const Select = styled.select`
  margin: 0rem 0.5rem;
  margin-right: 2rem;
  font-size: 1.2rem;
  height: 2rem;
`;

const Button = styled.button`
  font-size: 1.2rem;
  padding: 0rem 1rem;
  margin-left: 2rem;
`;

const TableContainer = styled.div`
  height: 70%;
  width: 100%;
`;
