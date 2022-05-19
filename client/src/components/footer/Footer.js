import React from "react";
import styled from "styled-components";
import { ImFacebook } from "react-icons/im";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";

function Footer() {
  return (
    <Div>
      <p>Follow Us</p>

      <Icons>
        <ImFacebook></ImFacebook>
        <AiOutlineInstagram></AiOutlineInstagram>
        <AiOutlineTwitter></AiOutlineTwitter>
      </Icons>

      <p>/EzyServices</p>
    </Div>
  );
}

const Div = styled.div`
  background-color: #565656;
  color: white;
  font-size: 1.3rem;
  line-height: 3rem;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  height: 3rem;
  text-align: center;
`;

const Icons = styled.div`
  margin: 0em 1em;
  width: 5em;
  /* border: 1px solid white; */
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Footer;
