import styled from "styled-components";

export const COLUMNS = [
  {
    Header: "Booking id",
    accessor: "booking_uid",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Service",
    accessor: "service",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Slot",
    accessor: "slot",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Button = styled.button`
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  background-color: #64dfdf;
  border: none;
  border-radius: 0.2rem;
  :hover {
    cursor: pointer;
  }
`;
