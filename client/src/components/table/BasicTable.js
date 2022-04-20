import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
// import { COLUMNS } from "./columns";
// import MOCK_DATA from "./MOCK_DATA.json";
import styled from "styled-components";
// import { createPath } from "react-router-dom";

export const Table = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
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
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </Button>
        <span>
          {" "}
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <Button onClick={nextPage} disabled={!canNextPage}>
          Next
        </Button>
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
  padding: 0.5rem 1rem;
`;
