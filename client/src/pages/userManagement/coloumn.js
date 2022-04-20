import styled from "styled-components";
import { onDelete } from "./deleteUser";
export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "user_name",
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

  {
    Header: "Delete",
    Cell: ({ row }) => (
      <ButtonRed onClick={() => onDelete(row.cells)}>Delete</ButtonRed>
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
