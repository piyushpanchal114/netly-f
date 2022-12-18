import React from "react";
import "./search-box.css";

const SearchBox = ({ onChange, value }) => (
  <input
    className="search-box"
    type="text"
    name="query"
    placeholder="Search..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBox;
