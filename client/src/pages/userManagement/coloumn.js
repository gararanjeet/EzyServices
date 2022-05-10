import styled from "styled-components";
import { onDelete } from "./deleteUser";
export const COLUMNS = [
  {
    Header: "ID",
    accessor: "index",
  },
  {
    Header: "Name",
    accessor: "userName",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Edit",
    Cell: ({ row }) => (
      <ButtonBlue onClick={() => console.log(row)}>Edit</ButtonBlue>
    ),
  },
];

const ButtonBlue = styled.button`
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  background-color: #64dfdf;
  border: none;
  border-radius: 0.2rem;
  :hover {
    cursor: pointer;
  }
`;

const ButtonRed = styled.button`
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #ed4e60;
  :hover {
    cursor: pointer;
  }
`;
