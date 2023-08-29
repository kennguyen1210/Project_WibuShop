/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import CustomerList from "./CustomerList";
import "./style.css";
function CustomerManager() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const call = async () => {
      const result = await axios.get("http://localhost:3000/customers");
      setData([...result.data]);
    };
    call();
  }, [rerender]);

  // search function
  const handleSearch = () => {
    const result = data.filter((e) => e.fullname.includes(searchValue));
    if (result.length) {
      setData([...result]);
      setSearchValue("");
    }
  };

  // reload function
  const handleReload = () => {
    setRerender((prev) => !prev);
  };

  return (
    <div className="customerManager">
      <h5>Customer Manager</h5>
      <div className="line"></div>
      <div className="createBtn">
        <div className="search">
          <input
            type="text"
            name="productSearch"
            id="productSearch"
            placeholder="   Search name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="button" className="searchBtn" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>
        <button type="button" className="reloadBtn" onClick={handleReload}>
          Reload
        </button>
      </div>
      <CustomerList data={data} method={handleReload} />
    </div>
  );
}

export default CustomerManager;
