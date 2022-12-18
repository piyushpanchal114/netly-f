import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, onSort, sortColumns, data }) => {
  return (
    <div>
      <TableHeader
        columns={columns}
        sortColumns={sortColumns}
        onSort={onSort}
      />
      <TableBody columns={columns} data={data} />
    </div>
  );
};

export default Table;
