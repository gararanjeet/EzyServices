import axios from "../../components/axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import ServiceProviderCard from "../../components/serviceproviderCard/ServiceProviderCard";
import empty from "../../images/empty.svg"

function CompletedRequests() {
  const [cookies] = useCookies();
  const [data, setData] = useState([]);
  const { id, token } = cookies;

  const fetchData = async () => {
    const result = await axios.get("/ServiceProvider/completed", {
      headers: { token: `Barers ${token}` },
      params: { id },
    });
    setData(result.data);
  };

  useEffect(() => fetchData(), []);
  return (
    <Completed>
      <Container>
        <Title>Completed</Title>
        {data.length > 0 ? (
          data.map((order) => (
            <ServiceProviderCard
              key={order.id}
              data={order}
            ></ServiceProviderCard>
          ))
        ) : (
          <img src={empty} alt="empty" />
        )}
      </Container>
    </Completed>
  );
}

export default CompletedRequests;

//

// export default AcceptedRequests;

const Completed = styled.div`
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
