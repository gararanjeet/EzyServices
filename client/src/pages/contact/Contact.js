import React from "react";
import styled from "styled-components";
import phone from "../../images/Contacts/phone.svg";
import mail from "../../images/Contacts/mail.svg";
import socialMedia from "../../images/Contacts/social.svg";

function Contact() {
  return (
    <ContactPage>
      <Container>
        <Details>
          <Img className="cell" src={phone} alt="phone" />
          <Img src={mail} alt="mail" />
        </Details>
        <SocialContact>
          <Img src={socialMedia} />
          <span>/ezyServices</span>
        </SocialContact>
      </Container>
    </ContactPage>
  );
}

export default Contact;

const ContactPage = styled.div`
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
    text-align: center;
  }
  height: 100%;
  width: 90%;
  margin: auto auto;
`;

const Details = styled.div`
  @media (min-width: 35rem) {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const Img = styled.img`
  margin-top: 20%;
  width: 90%;
  @media (min-width: 35rem) {
    width: 40%;
    margin-top: 10%;
    &.cell {
      margin-top: 17%;
    }
  }
`;

const SocialContact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5rem;
  Img {
    margin: 0rem;
  }
  span {
    margin-left: 2rem;
    font-size: 5rem;
  }
`;
