import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import TableBody from "./common/TableBody";
import TableHeader from "./common/TableHeader";

const MovieTable = ({ movies, onDelete, onSort, sortColumn }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movies/${movie.id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "delete",
      content: (movie) => (
        <button onClick={() => onDelete(movie)}>Delete</button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      {/* <table className="movies-table">
        <thead>
          <tr>
            <th onClick={() => raiseSort("title")}>Title</th>
            <th onClick={() => raiseSort("genre.name")}>Genre</th>
            <th onClick={() => raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => raiseSort("dailyRentalRate")}>Rate</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <button onClick={() => onDelete(movie)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default MovieTable;
