import styled from "styled-components";
export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
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
    Header: "Send Tender",
    width: 125,
    accessor: "tender_list",
    style: {
      cursor: "pointer",
    },
    Cell: ({ row }) => <Button onClick={console.log(row)}>Click me </Button>,
  },
];

const Button = styled.button`
  background-color: red;
`;
