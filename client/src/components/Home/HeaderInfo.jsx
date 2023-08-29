/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import AccountInfo from "../AccountInfo/AccountInfo";
import "../AccountInfo/style.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteLogin } from "../../redux/loginSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
function HeaderInfo() {
  const dispatch = useDispatch();
  const notifySuccess = () =>
    toast.success("Login Success!", {
      position: "top-center",
      autoClose: 2000,
    });
  // logout function
  const handleLogout = () => {
    dispatch(deleteLogin());
  };
  useEffect(() => {
    notifySuccess();
  }, []);

  const { login } = useSelector((state) => state.login);
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-light dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={login.avata} alt="avata" />
        {login.fullname}
      </button>
      <ul className="dropdown-menu" data-bs-auto-close="false">
        <li id="info_content">
          <AccountInfo
            avata={login.avata}
            type={login.type}
            fullname={login.fullname}
            sex={login.sex}
            email={login.email}
            address={login.address}
            phone={login.phone}
            cart={login.cart}
            account={login}
          />
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <span className="dropdown-item" onClick={handleLogout} id="logoutBtn">
            Log Out
          </span>
        </li>
      </ul>
    </div>
  );
}

export default HeaderInfo;
