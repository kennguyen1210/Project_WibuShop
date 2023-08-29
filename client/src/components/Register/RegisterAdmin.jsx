/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";
import { adminAvatas } from "../../redux/avata";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
function RegisterAdmin({ type }) {
  const notifySuccess = () =>
    toast.success("Register Success!", {
      position: "top-center",
      autoClose: 2000,
    });
  const [avataError, setAvataError] = useState("");
  const [checkAvata, setCheckAvata] = useState();
  const setAvata = (url) => {
    setAvataError("");
    setCheckAvata(url);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      checkCode: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(8, "Your fullname must be at least 8 characters!")
        .max(25, "Your fullname must be under 25 characters!")
        .required("You must fill in this section!"),
      email: Yup.string()
        .email("Invalid Email")
        .required("You must fill in this section!"),
      password: Yup.string()
        .min(6, "Your password must be at least 6 characters!")
        .required("You must fill in this section!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match!")
        .required("You must fill in this section!"),
      checkCode: Yup.string()
        .oneOf(["123456"], "Check Code does not match!")
        .required("You must fill in this section!"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (checkAvata) {
        let result = {
          ...values,
          state: true,
          type: type,
          avata: checkAvata,
          createDate: new Date(),
          id: uuidv4(),
        };
        console.log(result);
        setAvata("");
        resetForm();
        // call API
        const call = async () => {
          await axios.post("http://localhost:3000/admins", result);
        };
        const account = call().data;
        notifySuccess();
      } else {
        console.log("error");
      }
    },
  });
  // submit form
  const formSubmit = () => {
    if (!checkAvata) {
      setAvataError("You must pick a avata!");
    }
    formik.handleSubmit();
  };

  return (
    <>
      <div className="form-item">
        <label htmlFor="fullname">FullName</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.errors.fullname && formik.touched.fullname && (
        <span className="errorMessage">{formik.errors.fullname}</span>
      )}

      <div className="form-item">
        <label htmlFor="avata">Avata</label>
        <div className="avataGroup">
          {adminAvatas.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="avata"
              className={checkAvata === url ? "checkImg" : ""}
              onClick={(e) => setAvata(e.target.src)}
            />
          ))}
        </div>
      </div>
      {avataError && <span className="errorMessage">{avataError}</span>}

      <div className="form-item">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.email && formik.touched.email && (
        <span className="errorMessage">{formik.errors.email}</span>
      )}

      <div className="form-item">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.password && formik.touched.password && (
        <span className="errorMessage">{formik.errors.password}</span>
      )}

      <div className="form-item">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <span className="errorMessage">{formik.errors.confirmPassword}</span>
      )}

      <div className="form-item">
        <label htmlFor="code">Check Code</label>
        <input
          type="password"
          id="code"
          name="checkCode"
          value={formik.values.checkCode}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.checkCode && formik.touched.checkCode && (
        <span className="errorMessage">{formik.errors.checkCode}</span>
      )}

      <div className="submitBtn">
        <button className="saveBtn" type="button" onClick={formSubmit}>
          Save
        </button>
      </div>
    </>
  );
}

export default RegisterAdmin;
