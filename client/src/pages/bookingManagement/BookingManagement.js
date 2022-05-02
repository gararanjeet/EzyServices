import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "../../components/table/BasicTable";
import axios from "../../components/axios";
import { COLUMNS } from "./columns";
import Modal from "react-modal";
import BookingDetails from "../../components/modals/BookingDetails";

const DateFormat = (data) => {
  data.forEach((element) => {
    element.date = element.date.slice(0, 10);
  });
  return data;
};

function BookingManagement() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [detailsId, setDetailsId] = useState("");
  const [details, setDetails] = useState();
  const [assign, setAssignment] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const filter = () => {
    let info = data;
    if (statusFilter !== "") {
      info = info.filter(
        (element) => element.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    console.log("info", info);
    if (dateFilter !== "") {
      info = info.filter((element) => element.date === dateFilter);
    }
    setFilterData(info);
  };

  useEffect(() => {
    if (detailsId === "") return;
    setDetails(data.filter((element) => element.booking_uid === detailsId));
  }, [detailsId]);

  useEffect(() => {
    filter();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/Booking/list");
      const formatedData = DateFormat(result.data);
      await setData(formatedData);
    };
    fetchData();
  }, [refresh]);

  return (
    <BookingManagementPage>
      <Container>
        <Title>Booking Management</Title>
        <AccessBar>
          <Label>
            Date
            <Input
              type="Date"
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </Label>
          <Label>
            Status
            <Select onChange={(e) => setStatusFilter(e.target.value)}>
              <option value={""}>Select</option>
              <option value={"pending"}>Pending</option>
              <option value={"awaiting"}>Awaiting</option>
              <option value={"accepted"}>Accepted</option>
              <option value={"rejected"}>Rejected</option>
              <option value={"cancelled"}>Cancelled</option>
              <option value={"completed"}>Completed</option>
            </Select>
          </Label>
          <Button onClick={filter}>Filter</Button>
        </AccessBar>

        <TableContainer>
          <Table
            COLUMNS={COLUMNS}
            DATA={filterData}
            ViewDetails={true}
            setShowDetails={setShowDetails}
            setDetailsId={setDetailsId}
            setAssignment={setAssignment}
            setRefresh={setRefresh}
          ></Table>
        </TableContainer>
        <Modal
          isOpen={showDetails}
          style={ModalStyle}
          onRequestClose={() => {
            setShowDetails(false);
            setAssignment(false);
          }}
        >
          <BookingDetails
            data={details}
            open={setShowDetails}
            assign={assign}
            setRefresh={setRefresh}
          ></BookingDetails>
        </Modal>
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

const Title = styled.h1`
  margin-top: 3rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: #565656;
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
  width: 9rem;
`;

const Button = styled.button`
  font-size: 1.2rem;
  padding: 0rem 1rem;
  margin-left: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const TableContainer = styled.div`
  height: 70%;
  width: 100%;
`;

const ModalStyle = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  content: {
    position: "absolute",
    maxWidth: "min(600px, 90%)",
    height: "fit-content",
    margin: "auto auto",
    background: "white",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "2rem",
    outline: "none",
    padding: "20px",
    transition: "1s easy",
  },
};
