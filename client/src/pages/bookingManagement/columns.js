import styled from "styled-components";
import Div from "../../components/modals/JobCard";

export const COLUMNS = [
  {
    Header: "Booking id",
    accessor: "bookingUid",
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
    accessor: "serviceDate",
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
