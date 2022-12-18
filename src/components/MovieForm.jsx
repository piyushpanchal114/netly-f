import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Input from "./common/Input";
import Select from "./common/Select";
import { toast } from "react-toastify";
import "./movie-form.css";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    genre: {},
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  async function populateGenres() {
    const response = await getGenres();
    setGenres(response.data);
  }

  async function populateMovie() {
    if (id === "new") return;
    try {
      const { data: movie } = await getMovie(id);
      setData(mapToViewModel(movie));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) navigate("not-found");
    }
  }

  useEffect(() => {
    populateGenres();
    populateMovie();
  }, []);

  const mapToViewModel = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await saveMovie(data);
    toast.success("Changes Saved Sucessfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    const currData = { ...data };
    currData[e.target.name] = e.target.value;
    setData(currData);
  };

  return (
    <div className="movie-form-wrap">
      <div className="movie-form">
        <h1>Movie Form</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="title"
            label="Title"
            value={data.title}
            type="text"
            onChange={handleChange}
          />
          <Select
            name="genre"
            label="Genre"
            onChange={handleChange}
            value={data.genre}
            options={genres}
          />
          <Input
            name="numberInStock"
            label="Stock"
            value={data.numberInStock}
            type="text"
            onChange={handleChange}
          />
          <Input
            name="dailyRentalRate"
            label="Rate"
            value={data.dailyRentalRate}
            type="text"
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
