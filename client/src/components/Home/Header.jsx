/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";
import { useEffect, useState } from "react";
import HeaderInfo from "./HeaderInfo";
import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Header() {
  const [loginCheck, setLoginCheck] = useState(false);
  const login = useSelector((state) => state.login);
  useEffect(() => {
    setLoginCheck(login.loginCheck);
  }, [login]);
  return (
    <>
      <header className="header">
        <h2 className="title">
          <Link className="headerLogo" to="/home">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwDLn8LfOYoBq50-0E3VrxjWDr9tv7uJ7_pQ&usqp=CAU"
              alt="logo"
            />
            Wibu Shop
          </Link>

          <SearchComponent />
          {loginCheck ? <HeaderInfo /> : <HeaderLogin />}
        </h2>
      </header>
      <ToastContainer />
    </>
  );
}

export default Header;
