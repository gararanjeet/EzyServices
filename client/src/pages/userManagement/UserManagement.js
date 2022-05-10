import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "../../components/table/BasicTable";
import { COLUMNS } from "./coloumn";
import Modal from "react-modal";
import axios from "../../components/axios";
import SignupModal from "../../components/modals/SignupModal";
import { useCookies } from "react-cookie";
import { setIn } from "formik";

const addIndex = (rows) => {
  rows.forEach((row, index) => (row.index = index + 1));
  return rows;
};

function UserManagement() {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const [registerPopup, setRegisterpopup] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [cookie] = useCookies();
  const [refresh, setRefresh] = useState(0);

  const deleteUser = async (email) => {
    try {
      await axios.delete("/ServiceProvider/delete", {
        data: { email },
      });
      window.location.reload();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    let unOrderd = data;

    // if (filterBy === "") setFilteredData(data);
    if (filterBy !== "") unOrderd = data.filter((obj) => obj.role === filterBy);

    setFilteredData(addIndex(unOrderd));
  }, [filterBy]);

  useEffect(() => console.log(filteredData, "hello"), [filteredData]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get("/ServiceProvider/list", {
          headers: { token: `Barear ${cookie.token}` },
        })
        .catch((err) => console.log(err));
      setData(result.data);
      setFilteredData(addIndex(result.data));
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

  console.log(data, "data");
  console.log(services, "services");
  return (
    <UserManangementPage>
      <Container>
        <Title>User Management</Title>
        <AccessBar>
          <Input onChange={(e) => setFilterBy(e.target.value)}>
            <option value={""}>All</option>
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </Input>
          <AddUser onClick={() => setRegisterpopup(true)}>Add User </AddUser>
        </AccessBar>

        <TableContainer>
          <Table
            COLUMNS={COLUMNS}
            DATA={filteredData}
            deleteUser={deleteUser}
            setRefresh={setRefresh}
          ></Table>
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
