import { useEffect, useState } from "react";
import CardItem from "../Home/CardItem";
import { useSelector } from "react-redux";
function SearchResult() {
  const { figures, t_shirts } = useSelector((state) => state.products);
  const [product, setProduct] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const { search } = useSelector((state) => state.search);
  const pageSize = 4;
  const [page, setPage] = useState(1);
  let totalPage = Math.ceil(searchData.length / pageSize);
  useEffect(() => {
    const result = () => {
      if (search.type) {
        switch (search.type) {
          case "all": {
            let name = search.data;
            let resultFigure = figures.filter((item) => {
              return item.productName.includes(name);
            });
            let resultT_shirt = t_shirts.filter((item) => {
              return item.productName.includes(name);
            });
            return [...resultFigure, ...resultT_shirt];
          }
          case "Figure": {
            let name = search.data;
            let resultFigure = figures.filter((item) => {
              return item.productName.includes(name);
            });
            return [...resultFigure];
          }
          case "T_Shirt": {
            let name = search.data;
            let resultT_shirt = t_shirts.filter((item) => {
              return item.productName.includes(name);
            });
            return [...resultT_shirt];
          }
          default:
            break;
        }
      }
      return [];
    };
    setSearchData(result());
  }, [figures, search, t_shirts]);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex =
      page * pageSize > searchData.length ? searchData.length : page * pageSize;
    setProduct(searchData.slice(startIndex, endIndex));
  }, [page, searchData]);
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
            {page * 4 > product.length ? product.length : page * 4} items of{" "}
            {product.length} items
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

export default SearchResult;
