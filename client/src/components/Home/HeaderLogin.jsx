/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { update } from "../../redux/loginSlice";
import { useNavigate } from "react-router-dom";
function HeaderLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const notifyError = () =>
    toast.error("Login not success!", { autoClose: 1000 });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      accountType: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email!")
        .required("Please do not leave this field blank!"),
      password: Yup.string()
        .min(6, "Your password must be at least 6 characters!")
        .required("Please do not leave this field blank!"),
      accountType: Yup.string().required("Please pick one !"),
    }),
    onSubmit: (values, { resetForm }) => {
      let { email, password, accountType } = values;
      let result = data.filter((e) => e.email === email);
      if (result.length > 0) {
        if (result[0].password === password) {
          if (accountType === "admins") {
            if (result[0].state === "active") {
              resetForm();
              dispatch(update(result[0]));
              navigate("/home");
              return;
            }
            notifyError();
            return;
          } else {
            resetForm();
            dispatch(update(result[0]));
            return;
          }
        }
        notifyError();
      }
    },
  });

  useEffect(() => {
    async function fetchData(value) {
      const result = await axios.get(`http://localhost:3000/${value}`);
      setData([...result.data]);
    }
    if (formik.values.accountType) {
      fetchData(formik.values.accountType);
      return;
    }
    return;
  }, [formik.values.accountType]);

  return (
    <>
      <div className="dropdown loginBtn">
        <button
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          onClick={formik.handleReset}
        >
          <i className="bi bi-person"></i>Login
        </button>

        <form
          className="dropdown-menu p-4 loginDropdown form_register"
          style={{ width: "200px" }}
        >
          <div className="mb-3">
            <label htmlFor="select" className="form-label">
              Account Type
            </label>
            <select
              name="accountType"
              id="select"
              className="form-select-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accountType}
            >
              <option value="">Admin Or Customer</option>
              <option value="admins">Admin</option>
              <option value="customers">Customer</option>
            </select>
            {formik.errors.accountType && formik.touched.accountType && (
              <span style={{ color: "#ed7462" }}>
                {formik.errors.accountType}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleDropdownFormEmail2" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleDropdownFormEmail2"
              placeholder="email@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <span style={{ color: "#ed7462" }}>{formik.errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleDropdownFormPassword2"
              className="form-label"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleDropdownFormPassword2"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <span style={{ color: "#ed7462" }}>{formik.errors.password}</span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={formik.handleSubmit}
            style={{ fontSize: "12px", marginRight: "20px" }}
          >
            Sign in
          </button>
          <Link to="/register">Register</Link>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default HeaderLogin;
