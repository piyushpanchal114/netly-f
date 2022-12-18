import _ from "lodash";
import React from "react";
import { getGenres } from "../../services/genreService";
import "./table-body.css";

const TableBody = ({ data, columns }) => {
  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <div className="table-body">
      {data.map((item) => (
        <div key={item.id}>
          {columns.map((column) => (
            <span key={createKey(item, column)}>
              {renderCell(item, column)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
