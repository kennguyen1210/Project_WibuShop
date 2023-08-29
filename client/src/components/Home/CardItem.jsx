/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/cartSlice";
import { updateProduct } from "../../redux/productsSlice";
function CardItem(props) {
  let {
    price,
    productName,
    discount,
    image,
    anime,
    inventory,
    description,
    product,
  } = props;
  const [buyNumber, setBuyNumber] = useState(0);
  const dispatch = useDispatch();
  // next btn
  const nextbtn = () => {
    setBuyNumber((prev) => prev + 1);
  };

  // prev btn
  const prevBtn = () => {
    setBuyNumber((prev) => prev - 1);
  };

  // patch API
  // const patchData = async (data) => {
  //   let path = data.generic + "s";
  //   let id = data.id;
  //   console.log(data);
  //   await axios.patch(`http://localhost:3000/${path}/${id}`, {
  //     inventory: data.inventory,
  //   });
  // };
  // buy btn
  const handleBuy = () => {
    console.log("buy ");
    const addData = {
      ...product,
      number: buyNumber,
      inventory: inventory - buyNumber,
    };
    dispatch(addCart(addData));
    dispatch(updateProduct(addData));
    setBuyNumber(0);
  };
  return (
    <div className="col-3" id="cardItem">
      <div className="card" style={{ marginTop: "30px" }}>
        <img src={image} className="card-img-top" alt="image" />
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <div className="card-text">
            <span>{anime}</span>
            <p>{description}</p>
          </div>
          <div className="cardInfo">
            <span>
              Inventory:
              <span className={inventory === 0 ? "soldOut" : "inventory"}>
                {inventory === 0 ? "Sold Out" : inventory}
              </span>
            </span>
            <span>
              Price: <span className="price">${price}</span>
              <span className="sell">${(price * (100 - discount)) / 100}</span>
            </span>
          </div>
          <div className="cardAction">
            {buyNumber === 0 ? (
              <></>
            ) : (
              <span onClick={prevBtn}>
                <i className="bi bi-chevron-left"></i>
              </span>
            )}

            <span className="buyQuantum">{buyNumber}</span>
            {buyNumber === inventory ? (
              <></>
            ) : (
              <span onClick={nextbtn}>
                <i className="bi bi-chevron-right"></i>
              </span>
            )}

            <button
              type="button"
              onClick={handleBuy}
              disabled={buyNumber ? false : true}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
