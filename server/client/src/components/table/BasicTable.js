import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
// import { COLUMNS } from "./columns";
// import MOCK_DATA from "./MOCK_DATA.json";
import styled from "styled-components";
// import { createPath } from "react-router-dom";

export const Table = ({
  COLUMNS,
  DATA,
  ViewDetails,
  setShowDetails,
  setDetailsId,
  setAssignment,
}) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);

  const setpopup = (row, assign) => {
    setShowDetails(true);
    setDetailsId(row.cells[0].value);
    assign && setAssignment(true);
  };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "View",
        Header: "View",
        Cell: ({ row }) => <Button onClick={() => setpopup(row)}>View</Button>,
      },
      {
        Header: "Action",
        style: {
          zindex: "100",
        },
        Cell: ({ row }) => {
          if (
            ["completed", "cancelled"].includes(row.values.status.toLowerCase())
          )
            return <Button disabled={true}>Assign</Button>;
          else if (
            ["pending", "rejected"].includes(row.values.status.toLowerCase())
          )
            return <Button onClick={() => setpopup(row, true)}>Assign</Button>;
          else {
            return <Button onClick={() => setpopup(row, true)}>Modify</Button>;
          }
        },
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    ViewDetails === true && tableHooks,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <>
      <TableCompo {...getTableProps}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              style={headerStyle}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </TableCompo>
      <Pagination>
        <NavButton onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </NavButton>
        <span>
          {" "}
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <NavButton onClick={nextPage} disabled={!canNextPage}>
          Next
        </NavButton>
      </Pagination>
    </>
  );
};

const TableCompo = styled.table`
  width: 100%;
  border: none;
`;
const TableData = styled.td`
  text-align: center;
  font-size: 1.2rem;
`;

const TableBody = styled.tbody``;
const TableRow = styled.tr`
  height: 3rem;
  :nth-child(even) {
    background-color: #a0a0a0;
  }
  :nth-child(odd) {
    background-color: white;
  }
`;
const TableHead = styled.thead``;
const TableHeader = styled.th``;

const headerStyle = {
  backgroundColor: "#565656",
  color: "white",
  fontSize: "1.5rem",
};

const Pagination = styled.div`
  text-align: right;
  margin: 2rem 0;
`;

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

const NavButton = styled.button`
  font-size: 1.2rem;
  padding: 0.5rem;
`;
