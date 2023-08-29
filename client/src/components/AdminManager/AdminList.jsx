/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDeteteCheck } from "../../redux/EditSlice";
import axios from "axios";
function AdminList(props) {
  const { data, method } = props;

  const dispatch = useDispatch();

  const notifySuccess1 = () =>
    toast.success("Delete Success!", {
      position: "top-right",
      autoClose: 2000,
    });

  const notifySuccess2 = () =>
    toast.success("Change State Success!", {
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
      await axios.delete(`http://localhost:3000/admins/${id}`);
      window.location.reload();
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

  const handleEditState = async (e) => {
    const { id, state } = e;
    try {
      const result = await axios.patch(`http://localhost:3000/admins/${id}`, {
        state: !state,
      });
      console.log(result.data);
      method();
      notifySuccess2();
    } catch (error) {
      console.log(error);
      notifyError();
    }
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
  const [product, setProduct] = useState([]);
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

  // delete function
  const handleDelete = (data) => {
    handleShowConfirmBox(data);
  };

  return (
    <div className="adminList">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>FullName</th>
            <th>Avata</th>
            <th>Email</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.length ? (
            product.map((e, i) => (
              <tr key={i}>
                <td>{(page - 1) * 5 + i + 1}</td>
                <td style={{ width: "200px" }}>{e.id}</td>
                <td>{e.fullname}</td>
                <td>
                  <img src={e.avata} alt="avata" style={{ width: "60px" }} />
                </td>
                <td>{e.email}</td>
                <td>
                  <label htmlFor="active" style={{ marginRight: "20px" }}>
                    Active
                    <input
                      type="radio"
                      name={e.id}
                      id="active"
                      value="active"
                      checked={e.state ? true : false}
                      onChange={() => handleEditState(e)}
                    />
                  </label>
                  <label htmlFor="inActive">
                    InActive
                    <input
                      type="radio"
                      name={e.id}
                      id="inActive"
                      value="inActive"
                      checked={e.state ? false : true}
                      onChange={() => handleEditState(e)}
                    />
                  </label>
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
      </div>
    </div>
  );
}

export default AdminList;
