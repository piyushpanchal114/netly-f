import React from "react";
import "./table-header.css";

const TableHeader = ({ columns, onSort, ...sortColumn }) => {
  const raiseSort = (path) => {
    const currentColumn = { ...sortColumn };
    if (currentColumn.path === path)
      currentColumn.order = currentColumn.order === "asc" ? "desc" : "asc";
    else {
      currentColumn.path = path;
      currentColumn.order = "asc";
    }
    onSort(currentColumn);
  };

  return (
    <div className="table-header">
      {columns.map((column) => (
        <span
          key={column.path || column.key}
          onClick={() => raiseSort(column.path)}
        >
          {column.label}
        </span>
      ))}
    </div>
  );
};

export default TableHeader;
