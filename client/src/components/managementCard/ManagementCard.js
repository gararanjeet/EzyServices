import React from "react";
import styled from "styled-components";

function ManagementCard({ logo, text }) {
  return (
    <Card>
      <Image src={logo} alt="logo" />
      <ServiceName>{text}</ServiceName>
    </Card>
  );
}

export default ManagementCard;

const Card = styled.div`
  height: fit-content;
  text-align: center;
  background-color: white;
  box-shadow: 0 0 1.5rem #0000ff;
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem;
  :hover {
    transform: scale(1.03);
    transition: 0.1s ease;
  }
`;

const Image = styled.img`
  height: 7rem;
  margin-bottom: 2rem;
`;

const ServiceName = styled.p`
  font-size: 1.3rem;
  font-weight: bolder;
`;
