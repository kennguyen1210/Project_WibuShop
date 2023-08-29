/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { useSelector } from "react-redux";
function RenderCard(props) {
  const { title } = props;

  const data = useSelector((state) => {
    if (title === "Figure") {
      return state.products.figures;
    } else {
      return state.products.t_shirts;
    }
  });
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const pageSize = 4;
  const totalPage = Math.ceil(data.length / pageSize);
  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex =
      page * pageSize > data.length ? data.length : page * pageSize;
    console.log("end index", endIndex);
    setProduct(data.slice(startIndex, endIndex));
  }, [page, data]);
  // prev function
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  // next function
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <h3>{title}</h3>
      <div className="line"></div>
      <div className="row">
        {product.length > 0 &&
          product.map((item, index) => (
            <CardItem
              key={index}
              price={item.price}
              inventory={item.inventory}
              discount={item.discount}
              description={item.description}
              image={item.image}
              productName={item.productName}
              anime={item.anime}
              product={item}
            />
          ))}
      </div>
      <div className="pageGroup">
        <p>
          {(page - 1) * 4 + 1} to{" "}
          {page * 4 > data.length ? data.length : page * 4} items of{" "}
          {data.length} items
        </p>
        <button onClick={prevPage} disabled={page === 1 ? true : false}>
          Prev
        </button>
        <button onClick={nextPage} disabled={page === totalPage ? true : false}>
          Next
        </button>
      </div>
    </>
  );
}

export default RenderCard;
