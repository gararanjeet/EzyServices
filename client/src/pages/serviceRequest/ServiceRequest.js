import axios from "../../components/axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import ServiceProviderCard from "../../components/serviceproviderCard/ServiceProviderCard";

function ServiceRequest() {
  const [cookies] = useCookies();
  const [data, setData] = useState([]);

  const HandleClick = (data) => {
    console.log(data);
  };
  const fetchData = async () => {
    const { id, token } = cookies;
    const result = await axios.get("/ServiceProvider/orders", {
      headers: { token: `Barers ${token}` },
      params: { id },
    });
    setData(result.data);
  };
  useEffect(() => fetchData(), []);
  console.log(data);
  return (
    <ServiceProvider>
      <Container>
        {data.map((order) => (
          <ServiceProviderCard
            key={order.id}
            data={order}
            HandleClick={HandleClick}
          ></ServiceProviderCard>
        ))}
      </Container>
    </ServiceProvider>
  );
}

export default ServiceRequest;

const ServiceProvider = styled.div`
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
    margin-top: 9rem;
    align-items: center;
    flex-direction: column;
  }
  height: fit-content;
  width: 90%;
  margin: auto auto;
  margin: 3rem auto;
  padding-bottom: 5rem;

  /* border: 1px solid black; */
`;
