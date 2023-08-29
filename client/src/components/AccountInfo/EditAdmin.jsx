/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { adminAvatas } from "../../redux/avata";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editLogin } from "../../redux/loginSlice";
import { setEdit } from "../../redux/EditSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function EditAdmin({ edit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifySuccess = () =>
    toast.success("Edit Success!", {
      position: "top-center",
      autoClose: 2000,
    });
  const [avataError, setAvataError] = useState("");
  const [checkAvata, setCheckAvata] = useState(edit.avata);
  const setAvata = (url) => {
    setAvataError("");
    setCheckAvata(url);
  };

  const formik = useFormik({
    initialValues: {
      fullname: edit.fullname,
      email: edit.email,
      oldPassword: edit.password,
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(8, "Your fullname must be at least 8 characters!")
        .max(25, "Your fullname must be under 25 characters!")
        .required("You must fill in this section!"),
      email: Yup.string()
        .email("Invalid Email")
        .required("You must fill in this section!"),
      newPassword: Yup.string()
        .min(6, "Your password must be at least 6 characters!")
        .required("You must fill in this section!"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Password does not match!")
        .required("You must fill in this section!"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const { fullname, email, newPassword } = values;
      if (checkAvata) {
        let result = {
          fullname: fullname,
          email: email,
          type: edit.type,
          password: newPassword,
          state: edit.state,
          avata: checkAvata,
          updateDate: new Date().toLocaleDateString(),
          createDate: edit.createDate,
          id: edit.id,
        };
        console.log(result);
        setAvata("");
        resetForm();
        // call API
        const call = async () => {
          await axios.patch(`http://localhost:3000/admins/${edit.id}`, {
            ...result,
          });
        };
        const account = call().data;
        dispatch(editLogin(result));
        dispatch(setEdit({}));
        notifySuccess();
        navigate("/home");
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
    console.log("submit");
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
        <span>{edit.password}</span>
      </div>

      <div className="form-item">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.newPassword && formik.touched.newPassword && (
        <span className="errorMessage">{formik.errors.newPassword}</span>
      )}

      <div className="form-item">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.confirmNewPassword &&
        formik.touched.confirmNewPassword && (
          <span className="errorMessage">
            {formik.errors.confirmNewPassword}
          </span>
        )}

      <div className="submitBtn">
        <button className="saveBtn" type="button" onClick={formSubmit}>
          Save
        </button>
      </div>
    </>
  );
}

export default EditAdmin;
