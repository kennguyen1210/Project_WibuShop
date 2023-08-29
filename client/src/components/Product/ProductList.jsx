/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createOrUpdateProduct,
  setEditProduct,
} from "../../redux/productsSlice";
import { useDispatch } from "react-redux";
function ProductList(props) {
  const { data, showForm, check } = props;
  const [hiden, setHiden] = useState(false);
  useEffect(() => {
    setPage(1);
  }, [data]);
  useEffect(() => {
    hiden ? showForm() : "";
  }, [hiden]);
  const dispatch = useDispatch();
  const notifySuccess = () =>
    toast.success("Delete Success!", {
      position: "top-right",
      autoClose: 2000,
    });
  const handleConfirm = async (data) => {
    // Xử lý khi người dùng xác nhận
    const { id, generic } = data;
    try {
      await axios.delete(`http://localhost:3000/${generic}s/${id}`);
      dispatch(createOrUpdateProduct());
      notifySuccess();
    } catch (error) {
      console.log(error);
    }
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

  const [product, setProduct] = useState([]);
  const pageSize = 10;
  const totalPage = Math.ceil(data.length / pageSize);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex =
      page * pageSize > data.length ? data.length : page * pageSize;
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
  // edit function
  const handleEdit = (data) => {
    const result = { ...data };
    setHiden(true);
    dispatch(setEditProduct(result));
  };

  // delete function
  const handleDelete = (data) => {
    handleShowConfirmBox(data);
  };

  return (
    <div className="productList">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>ProductName</th>
            <th>Image</th>
            <th>Anime</th>
            <th>Generic</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Inventory</th>
            <th>Desription</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.length ? (
            product.map((e, i) => (
              <tr key={i}>
                <td style={{ width: "15px" }}>{(page - 1) * 10 + i + 1}</td>
                <td>{e.id}</td>
                <td>{e.productName}</td>
                <td>
                  <img src={e.image} alt="image" style={{ width: "30px" }} />
                </td>
                <td>{e.anime}</td>
                <td>{e.generic}</td>
                <td>{e.price}$</td>
                <td>{e.discount}%</td>
                <td>{e.inventory}</td>
                <td>{e.description}</td>
                <td>
                  <i className="bi bi-pencil" onClick={() => handleEdit(e)}></i>
                  <i
                    className="bi bi-trash3"
                    onClick={() =>
                      handleDelete({ id: e.id, generic: e.generic })
                    }
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <div className="pageGroup" style={{ marginBottom: "10px" }}>
        <p>
          {(page - 1) * 10 + 1} to{" "}
          {page * 10 > data.length ? data.length : page * 10} items of{" "}
          {data.length} items
        </p>
        <button onClick={prevPage} disabled={page === 1 ? true : false}>
          Prev
        </button>
        <button onClick={nextPage} disabled={page === totalPage ? true : false}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
