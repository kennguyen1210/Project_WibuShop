/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminList from "./AdminList";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
function AdminManager() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const call = async () => {
      const result = await axios.get("http://localhost:3000/admins");
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
  // const handleDelete = async (id) => {
  //   // Xử lý khi người dùng xác nhận
  //   try {
  //     await axios.delete(`http://localhost:3000/admins/${id}`);
  //     notifySuccess1();
  //     handleReload();
  //   } catch (error) {
  //     console.log(error);
  //     notifyError();
  //   }
  // };
  return (
    <div className="AdminManager">
      <h5>Admin Manager</h5>
      <div className="line"></div>
      <div className="createBtn">
        <div className="search">
          <input
            type="text"
            name="adminSreach"
            id="adminSreach"
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
      <AdminList data={data} method={handleReload} />
    </div>
  );
}

export default AdminManager;
