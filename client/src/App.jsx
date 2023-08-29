/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "./components/Home/Header";
import Navbar from "./components/Home/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Home/Footer";
import Payment from "./components/Payment/Payment";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart/Cart";
import ProductManager from "./components/Product/ProductManager";
import Register from "./components/Register/Register";
import AdminManager from "./components/AdminManager/AdminManager";
import CustomerManager from "./components/CustomerManager/CustomerManager";
import SearchResult from "./components/SearchProduct/SearchResult";
import BuySuccess from "./components/Home/BuySuccess";
import Error404 from "./components/Error404/Error404";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setFigure, setT_shirt } from "./redux/productsSlice";
import Result from "./components/SearchProduct/Result";
import { useSelector } from "react-redux";
import EditAccount from "./components/AccountInfo/EditAccount";
function App() {
  const dispatch = useDispatch();
  const checkUpdate = useSelector((state) => state.products.checkUpdate);
  useEffect(() => {
    const fetchData = async () => {
      let figures = await axios.get(" http://localhost:3000/Figures");
      dispatch(setFigure(figures.data));
      let t_shirts = await axios.get("http://localhost:3000/T-Shirts");
      dispatch(setT_shirt(t_shirts.data));
    };

    fetchData();
  }, [checkUpdate]);
  return (
    <div className="App" style={{ position: "relative" }}>
      <div className="sticky">
        <Header></Header>
        <Navbar></Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product" element={<ProductManager />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin" element={<AdminManager />}></Route>
        <Route path="/customer" element={<CustomerManager />}></Route>
        <Route path="/result2/:type/:anime" element={<Result />}></Route>
        <Route path="/buySuccess" element={<BuySuccess />}></Route>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/result" element={<SearchResult />}></Route>
        <Route path="/edit" element={<EditAccount />}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
