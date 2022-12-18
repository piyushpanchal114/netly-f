import http from "./httpService";

export function getGenres() {
  return http.get("https://netly-vercel.vercel.app/api/genres");
}
