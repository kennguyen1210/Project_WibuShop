/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import CustomerInfo from "./CustomerInfo";
function CustomerList(props) {
  const { data, method } = props;
  const [product, setProduct] = useState([...data]);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState();
  const notifySuccess1 = () =>
    toast.success("Delete Success!", {
      position: "top-right",
      autoClose: 2000,
    });
  const notifyError = () =>
    toast.error("Error!", {
      position: "top-right",
      autoClose: 2000,
    });
  const handleConfirm = async (id) => {
    // Xử lý khi người dùng xác nhận
    try {
      await axios.delete(`http://localhost:3000/customers/${id}`);
      method();
      notifySuccess1();
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };
  const handleCancel = () => {
    // Xử lý khi người dùng hủy bỏ
    // toast.error("Cancelled");
  };

  const handleShowConfirmBox = (id) => {
    toast.info(
      <div>
        Are you sure you want to proceed?
        <br />
        <button
          className="btn btn-primary"
          onClick={() => handleConfirm(id)}
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

  const pageSize = 5;
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
  //handle show
  const handleShow = (info) => {
    setInfo({ ...info });
    setShow(true);
  };
  const handleHidenShow = () => {
    setShow(false);
  };
  // next function
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  // delete function
  const handleDelete = (data) => {
    handleShowConfirmBox(data);
  };
  return (
    <div className="customerList">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Avata</th>
            <th>FullName</th>
            <th>Email</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.length ? (
            product.map((e, i) => (
              <tr key={i}>
                <td>{(page - 1) * 5 + i + 1}</td>
                <td style={{ width: "200px" }}>{e.id}</td>
                <td>
                  <img src={e.avata} alt="avata" style={{ width: "60px" }} />
                </td>
                <td>{e.fullname}</td>
                <td>{e.email}</td>
                <td>
                  More Info
                  <i
                    className="bi bi-info-square"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleShow(e)}
                  ></i>
                </td>
                <td>
                  <i
                    className="bi bi-trash3"
                    onClick={() => handleDelete(e.id)}
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
          {(page - 1) * 5 + 1} to{" "}
          {page * 5 > data.length ? data.length : page * 5} items of{" "}
          {data.length} items
        </p>
        <button onClick={prevPage} disabled={page === 1 ? true : false}>
          Prev
        </button>
        <button onClick={nextPage} disabled={page === totalPage ? true : false}>
          Next
        </button>
        {show ? <CustomerInfo info={info} method={handleHidenShow} /> : <></>}
      </div>
    </div>
  );
}

export default CustomerList;
