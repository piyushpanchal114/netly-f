import _ from "lodash";
import React, { useState, useEffect } from "react";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MovieTable from "./MovieTable";
import Pagination from "./common/Pagination";
import "./movies.css";
import SearchBox from "./common/SearchBox";
import { toast } from "react-toastify";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [genre, setGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  async function populateGenre() {
    const response = await getGenres();
    const genres = [{ id: "", name: "AllGenres" }, ...response.data];
    setGenre(genres);
  }

  async function populateMovies() {
    const response = await getMovies();
    setMoviesList(response.data);
  }

  useEffect(() => {
    populateGenre();
    populateMovies();
  }, []);

  const handleDelete = async (movie) => {
    const originalMovies = [...moviesList];
    const newMovies = originalMovies.filter((m) => m.id !== movie.id);
    setMoviesList(newMovies);

    try {
      await deleteMovie(movie.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This Movie is already been deleted.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      setMoviesList(originalMovies);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSort = (currentColumn) => {
    setSortColumn(currentColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };
  const getPagedData = () => {
    let filtered = moviesList;
    if (searchQuery)
      filtered = moviesList.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.id)
      filtered = moviesList.filter((m) => m.genre.id === selectedGenre.id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  const { data: movies, totalCount } = getPagedData();

  if (moviesList.length === 0) return <p>No Movies in database</p>;

  return (
    <div className="movies-container">
      <div className="movies-side">
        <ListGroup
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
          items={genre}
          valueProperty="id"
          textProperty="name"
        />
      </div>
      <div className="movies-wrap">
        <p>Showing {totalCount} Movies.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MovieTable
          movies={movies}
          onDelete={handleDelete}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          pageSize={pageSize}
          itemsCount={totalCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
