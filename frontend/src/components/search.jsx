import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { doSearch } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.search);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    dispatch(doSearch(searchQuery));
    setSearchQuery("");
    navigate("/stocks");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "50vw",
    marginRight: "2px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Ticker"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          value={searchQuery}
          autoFocus={true}
          className="searchID"
        />
      </Search>
    </form>
  );
};

export default SearchBar;
