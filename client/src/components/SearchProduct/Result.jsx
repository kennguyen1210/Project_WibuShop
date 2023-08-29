import { useEffect, useState } from "react";
import CardItem from "../Home/CardItem";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Result() {
  const param = useParams();
  const { figures, t_shirts } = useSelector((state) => state.products);
  const [product, setProduct] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const pageSize = 4;
  const [page, setPage] = useState(1);
  let totalPage = Math.ceil(searchData.length / pageSize);
  useEffect(() => {
    const result = () => {
      if (param.type === "figure") {
        if (param.anime !== "all") {
          const dataResult = [...figures].filter(
            (e) => e.anime === param.anime
          );
          if (dataResult.length > 0) {
            setSearchData([...dataResult]);
            return;
          }
        }
        setSearchData([...figures]);
        return;
      }
      if (param.type === "T-shirt") {
        if (param.anime !== "all") {
          const dataResult = [...t_shirts].filter(
            (e) => e.anime === param.anime
          );
          if (dataResult.length > 0) {
            setSearchData([...dataResult]);
            return;
          }
        }
        setSearchData([...t_shirts]);
        return;
      }
      return [];
    };
    result();
  }, [figures, t_shirts, param]);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex =
      page * pageSize > searchData.length ? searchData.length : page * pageSize;
    setProduct(searchData.slice(startIndex, endIndex));
  }, [page, searchData, param]);
  // prev function
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  // next function
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="SearchResult">
      <div className="container">
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
            {page * 4 > searchData.length ? searchData.length : page * 4} items
            of {searchData.length} items
          </p>
          <button onClick={prevPage} disabled={page === 1 ? true : false}>
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPage ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
