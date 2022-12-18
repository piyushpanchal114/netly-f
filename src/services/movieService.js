import http from "./httpService";

const apiEndpoint = "https://netly-vercel.vercel.app/api/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  const genre = movie.genre.id;
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    // console.log("movie", movie);
    // console.log("body", body);
    body.genreId = genre;
    // console.log(http.put(apiEndpoint + "/" + movie.id + "/", body));
    return http.put(apiEndpoint + "/" + movie.id + "/", body);
  }
  return http.post(apiEndpoint + "/", movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
