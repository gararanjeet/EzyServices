import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import styled from "styled-components";

export const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableCompo {...getTableProps}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column) => (
              <TableHeader {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps}>
        {rows.map((row) => {
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
  );
};

const TableCompo = styled.table`
  width: 100%;
  /* border: 1px solid black; */
`;
const TableData = styled.td`
  text-align: center;
`;

const TableBody = styled.tbody``;
const TableRow = styled.tr`
  height: 2.5rem;
  :nth-child(even) {
    background-color: #a0a0a0;
  }
  :nth-child(odd) {
    background-color: white;
  }
`;
const TableHead = styled.thead`

`;
const TableHeader = styled.th``;
