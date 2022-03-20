import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function DropDown() {
  const Dropdown = styled.div`
    position: absolute;
    top: 5rem;
    width: max-content;
    background-color: #d5d421;
    border-radius: 0.4rem;
    @media (max-width: 35rem) {
      position: relative;
      top: 0rem;
      background-color: #565656;
      z-index: 999;
      width: 100%;
    }
  `;
  const DropdownItems = styled.div`
    text-align: center;
    text-align: center;
    text-decoration: none;
    font-size: 1.3rem;
    padding: 0.4em;
    color: white;
    border-radius: 0.4rem;
    a {
      text-decoration: none;
      color: white;
    }
    @media (min-width: 35rem) {
      background-color: #d5d421;
      color: #565656;
      background-color: none;
      a {
        text-decoration: none;
        color: #565656;
      }
    }
    :hover {
      transform: scale(1.02);
      transition: ease;
      background-color: #d5d421;
      cursor: pointer;
    }
  `;
  return (
    <Dropdown>
      <DropdownItems>
        <Link to="/waterservices">Water Serviceing</Link>
      </DropdownItems>

      <DropdownItems>House Keeping</DropdownItems>
    </Dropdown>
  );
}

export default DropDown;
