/* eslint-disable no-unused-vars */
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchByName } from "../../redux/searchSlice";
function ProductManager() {
  const dispatch = useDispatch();
  const { figures, t_shirts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const { searchByName } = useSelector((state) => state.search);
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (searchByName) {
      let name = searchByName;
      let resultFigure = figures.filter((item) => {
        return item.productName.includes(name);
      });
      let resultT_shirt = t_shirts.filter((item) => {
        return item.productName.includes(name);
      });
      setData([...resultFigure, ...resultT_shirt]);
    } else if (filterOption) {
      switch (filterOption) {
        case "Figure":
          {
            setData([...figures]);
          }
          break;
        case "T-Shirt":
          {
            setData([...t_shirts]);
          }
          break;
        default: {
          let resultFigure = figures.filter((item) => {
            return item.anime === filterOption;
          });
          let resultT_shirt = t_shirts.filter((item) => {
            return item.anime === filterOption;
          });
          setData([...resultFigure, ...resultT_shirt]);
        }
      }
    } else {
      setData([...figures, ...t_shirts]);
    }
  }, [figures, t_shirts, searchByName, filterOption, showForm]);

  // show form
  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };
  // search change
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  // send search
  const handleSendSearch = () => {
    dispatch(setSearchByName(searchValue));
    setSearchValue("");
  };
  // reload function
  const handleReload = () => {
    setFilterOption("");
  };
  // filter function
  const handleFilter = (value) => {
    setFilterOption(value);
  };

  return (
    <div className="product">
      <h5>Product Manager</h5>
      <div className="line"></div>
      <div className="createBtn">
        <div className="search">
          <input
            type="text"
            name="productSearch"
            id="productSearch"
            placeholder="   Search name"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            type="button"
            className="searchBtn"
            onClick={handleSendSearch}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div className="filter">
          <label htmlFor="filter" style={{ marginRight: "20px" }}>
            Filter
          </label>
          <select
            name="filter"
            id="filter"
            onChange={(e) => handleFilter(e.target.value)}
            value={filterOption}
          >
            <option value="">Filter Option</option>
            <option value="Figure">Figure</option>
            <option value="T-Shirt">T-shirt</option>
            <option value="onepiece">Onepiece</option>
            <option value="bleach">Bleach</option>
            <option value="naruto">Naruto</option>
            <option value="kimetsuNoYaiba">Kimetsu No Yaiba</option>
          </select>
        </div>
        <button className="addBtn" type="button" onClick={handleShowForm}>
          Add New Product
        </button>
        <button type="button" className="reloadBtn" onClick={handleReload}>
          Reload
        </button>
      </div>
      {showForm ? (
        <CreateProduct showForm={handleShowForm} check={showForm} />
      ) : (
        <ProductList data={data} showForm={handleShowForm} check={showForm} />
      )}
    </div>
  );
}

export default ProductManager;
