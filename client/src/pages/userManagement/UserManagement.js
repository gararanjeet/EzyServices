import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "../../components/table/BasicTable";
import { COLUMNS } from "./coloumn";
import Modal from "react-modal";
import axios from "../../components/axios";
import SignupModal from "../../components/modals/SignupModal";

function UserManagement() {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const [registerPopup, setRegisterpopup] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const funct = () => {
    console.log("hello");
  };

  useEffect(() => {
    console.log("value changed", filterBy);
    if (filterBy === "") setFilteredData(data);
    else setFilteredData(data.filter((obj) => obj.role === filterBy));
  }, [filterBy]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get("/ServiceProvider/list", [])
        .catch((err) => console.log(err));
      setData(result.data);
      setFilteredData(result.data);
    };

    const fetchServices = async () => {
      const result = await axios
        .get("/Service/list", [])
        .catch((err) => console.log(err));
      setServices(result.data);
    };
    fetchData();
    fetchServices();
  }, []);

  console.log(data);
  console.log(services);
  return (
    <UserManangementPage>
      <Container>
        <AccessBar>
          <Input onChange={(e) => setFilterBy(e.target.value)}>
            <option value={""}>All</option>
            {services.map((service) => (
              <option key={service.name}>{service.name}</option>
            ))}
          </Input>
          <AddUser onClick={() => setRegisterpopup(true)}>Add User </AddUser>
        </AccessBar>

        <TableContainer>
          <Table COLUMNS={COLUMNS} DATA={filteredData}></Table>
        </TableContainer>
      </Container>
      <Modal
        isOpen={registerPopup}
        style={ModalStyle}
        onRequestClose={() => setRegisterpopup(false)}
      >
        <SignupModal Open={setRegisterpopup} registerServiceProvider={true} />
      </Modal>
    </UserManangementPage>
  );
}

export default UserManagement;

const UserManangementPage = styled.div`
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
    /* margin-top: 9rem; */
  }
  height: 100%;
  /* border: 1px solid black; */
  width: 90%;
  margin: auto auto;
  /* margin-top: 3rem; */
`;

const AccessBar = styled.div`
  display: flex;
  height: fit-content;
  /* border: 1px solid black; */
  margin-top: 4rem;
  justify-content: right;
`;

const Input = styled.select`
  margin-right: 1rem;
  width: 15rem;
  font-size: 1.2rem;
  text-align: center;
`;

const AddUser = styled.button`
  font-size: 1.2rem;
  border: none;
  height: fit-content;
  padding: 0.5rem 1rem;
  background-color: #565656;
  color: white;
  border-radius: 0.2rem;
  :hover {
    cursor: pointer;
  }
  /* text-align: center; */
`;

const TableContainer = styled.div`
  margin-top: 4rem;
  overflow-x: scroll;
  /* border: 1px solid black; */
`;

const ModalStyle = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    maxWidth: "500px",
    height: "fit-content",
    margin: "auto auto",
    border: "1px solid #ccc",
    background: "#565656",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "2rem",
    outline: "none",
    padding: "20px",
    transition: "1s easy",
  },
};
