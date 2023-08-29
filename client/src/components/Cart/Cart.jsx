/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { minusCart, plusCart, deleteCart } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function Cart() {
  const navigate = useNavigate();
  const { carts, cartNumber } = useSelector((state) => state.carts);

  const notifyCart = () =>
    toast.info("Cart is empty. You can pay after purchase!", {
      position: "top-center",
    });
  const handlePayment = () => {
    cartNumber ? navigate("/payment") : notifyCart();
  };
  return (
    <>
      <div className="Cart">
        <h5>Cart</h5>
        <div className="line"></div>
        <div className="cartList">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>ProductName</th>
                <th>Quantum</th>
                <th>Total Money</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, i) => (
                <CartItem key={cart.id} cart={cart} index={i} id={cart.id} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>Total</td>
                <td></td>
                <td>{cartNumber}</td>
                <td>
                  $
                  {carts.reduce(
                    (value, cur) =>
                      (value +=
                        cur.price * cur.number * (1 - cur.discount / 100)),
                    0
                  )}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <button className="paymentBtn" type="button" onClick={handlePayment}>
            Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
