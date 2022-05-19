import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import ServiceProviderCard from "../../components/serviceproviderCard/ServiceProviderCard";
import axios from "../../components/axios";
import empty from "../../images/empty.svg";

function PendingRequests() {
  const [cookies] = useCookies();
  const [data, setData] = useState([]);
  const { id, token } = cookies;

  const HandleAction = async (info, action) => {
    const bookingId = info._id;
    try {
      axios.patch("/serviceProvider/decision", {
        headers: { token: `Barers ${token}` },
        serviceProviderId: id,
        bookingId,
        action,
      });
      fetchData();
    } catch {
      console.log("error");
    }
  };

  const fetchData = async () => {
    console.log(id);
    const result = await axios.get("/ServiceProvider/awaiting", {
      headers: { token: `Barers ${token}` },
      params: { id },
    });
    setData(result.data);
  };
  useEffect(() => fetchData(), []);

  return (
    <Pending>
      <Container>
        <Title>Pending </Title>
        {data.length > 0 ? (
          data.map((order) => (
            <ServiceProviderCard
              key={order._id}
              data={order}
              HandleAction={HandleAction}
            ></ServiceProviderCard>
          ))
        ) : (
          <Img src={empty} alt="empty" />
        )}
      </Container>
    </Pending>
  );
}

export default PendingRequests;
const Pending = styled.div`
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
  overflow: scroll;
`;

const Container = styled.div`
  @media (min-width: 35rem) {
    display: flex;
    width: 90%;
    max-width: 1400px;
    margin-top: 3rem;
    align-items: center;
    flex-direction: column;
  }
  height: fit-content;
  width: 90%;
  margin: auto auto;
  margin: 1rem auto;
  padding-bottom: 5rem;

  /* border: 1px solid black; */
`;

const Title = styled.h1`
  margin-bottom: 3rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: #565656;
`;

const Img = styled.img`
  margin-top: 3rem;
  opacity: 0.5;
`;
