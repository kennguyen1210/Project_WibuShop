/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useState } from "react";
import { minusCart, plusCart, deleteCart } from "../../redux/cartSlice";
import { removeProduct, updateProduct } from "../../redux/productsSlice";
import patchData from "../../until/request";
import { toast } from "react-toastify";
function CartItem(props) {
  const handleConfirm = (data) => {
    // Xử lý khi người dùng xác nhận
    dispatch(removeProduct(data));
    dispatch(deleteCart(data));
    toast.success("Confirmed", { autoClose: 1000 });
  };

  const handleCancel = () => {
    // Xử lý khi người dùng hủy bỏ
    // toast.error("Cancelled");
  };

  const handleShowConfirmBox = (data) => {
    toast.info(
      <div>
        Are you sure you want to proceed?
        <br />
        <button
          className="btn btn-primary"
          onClick={() => handleConfirm(data)}
          style={{ marginRight: "20px" }}
        >
          Confirm
        </button>
        <button className="btn btn-warning" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  };

  let { index, cart } = props;
  const dispatch = useDispatch();
  // minus cart
  const minusProduct = (cart) => {
    const data = {
      ...cart,
      number: cart.number - 1,
      inventory: cart.inventory + 1,
    };
    dispatch(updateProduct(data));
    dispatch(minusCart(cart));
  };

  // plus product
  const plusProduct = (cart) => {
    const data = {
      ...cart,
      number: cart.number + 1,
      inventory: cart.inventory - 1,
    };
    dispatch(updateProduct(data));
    dispatch(plusCart(cart));
  };

  // delete cart
  const deleteProduct = (cart) => {
    handleShowConfirmBox(cart);
  };
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <img src={cart.image} alt="productImage" style={{ width: "40px" }} />
        </td>
        <td>{cart.productName}</td>
        <td>
          <span
            style={{ marginRight: "10px" }}
            className={cart.number === 1 ? "hiddenBtn" : ""}
          >
            <i
              className="bi bi-chevron-left"
              onClick={() => minusProduct(cart)}
            ></i>
          </span>
          {cart.number}
          <span
            style={{ marginLeft: "10px" }}
            className={cart.inventory ? "" : "hiddenBtn"}
          >
            <i
              className="bi bi-chevron-right"
              onClick={() => plusProduct(cart)}
            ></i>
          </span>
        </td>
        <td>${cart.price * cart.number * (1 - cart.discount / 100)}</td>
        <td>
          <i
            className="bi bi-trash3 deleteIcon"
            onClick={() => deleteProduct(cart)}
          ></i>
        </td>
      </tr>
    </>
  );
}

export default CartItem;
