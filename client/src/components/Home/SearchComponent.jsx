import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { setSearchContent } from "../../redux/searchSlice";
import { useNavigate } from "react-router-dom";
function SearchComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSreach] = useState("");
  const [type, setType] = useState("all");

  // select function
  const handleTypeChange = (value) => {
    console.log("value", value);
    setType(value);
  };
  // input function
  const handleSearchChange = (value) => {
    setSreach(value);
  };
  //notify
  const notitySearch = () =>
    toast.info("Input some thing in search!", {
      position: "top-center",
      autoClose: 2000,
    });
  // submit form
  const handleSubmit = () => {
    if (!search) {
      notitySearch();
      return;
    }
    const data = {
      type: type,
      data: search,
    };
    setSreach("");
    setType("all");
    console.log(data);
    dispatch(setSearchContent(data));
    navigate("/result");
  };
  return (
    <>
      <form className="searchForm">
        <select
          name="searchOption"
          id="searchOption"
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Figure">Figure</option>
          <option value="T_Shirt">T-Shirt</option>
        </select>
        <label htmlFor="search" className="searchLable">
          <input
            type="search"
            placeholder="Search by name"
            id="search"
            name="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button
            className="searchBtn"
            type="button"
            onClick={handleSubmit}
            style={{ marginLeft: "10px" }}
          >
            <i className="bi bi-search"></i>
          </button>
        </label>
      </form>
    </>
  );
}

export default SearchComponent;
