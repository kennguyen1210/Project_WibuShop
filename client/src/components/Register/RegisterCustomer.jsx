/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { customerAvatas } from "../../redux/avata";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
function RegisterCustomer({ type }) {
  const notifySuccess = () =>
    toast.success("Register Success!", {
      position: "top-center",
      autoClose: 2000,
    });
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const [checkAvata, setCheckAvata] = useState();
  const [avataError, setAvataError] = useState();
  const setAvata = (url) => {
    setAvataError("");
    setCheckAvata(url);
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  Yup.string().matches(phoneRegExp, "Phone number is not valid");
  const formik = useFormik({
    initialValues: {
      fullname: "",
      sex: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(8, "Your fullname must be at least 8 characters!")
        .max(25, "Your fullname must be under 25 characters!")
        .required("You must fill in this section!"),
      sex: Yup.string().required("You must fill in this section!"),
      dateOfBirth: Yup.date()
        .max(
          formatDate(new Date()),
          `Your date of birth must be under ${formatDate(new Date())}`
        )
        .required("You must fill in this section!"),
      email: Yup.string()
        .email("Invalid Email")
        .required("You must fill in this section!"),
      password: Yup.string()
        .min(6, "Your fullname must be at least 6 characters!")
        .required("You must fill in this section!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match !")
        .required("You must fill in this section!"),
      address: Yup.string().required("You must fill in this section!"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("You must fill in this section!"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (checkAvata) {
        const result = {
          ...values,
          type: type,
          avata: checkAvata,
          createDate: new Date(),
          id: uuidv4(),
        };
        setCheckAvata("");
        console.log(result);
        resetForm();
        //call api
        const call = async () => {
          await axios.post("http://localhost:3000/customers", result);
        };
        call();
        notifySuccess();
      } else {
        console.log("ERROR");
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
        <label htmlFor="">Sex</label>
        <input
          type="radio"
          name="sex"
          id="male"
          value="male"
          checked={formik.values.sex === "male" ? true : false}
          onChange={formik.handleChange}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="sex"
          id="female"
          checked={formik.values.sex === "female" ? true : false}
          value="female"
          onChange={formik.handleChange}
        />
        <label htmlFor="male">Female</label>
      </div>
      {formik.errors.sex && formik.touched.sex && (
        <span className="errorMessage">{formik.errors.sex}</span>
      )}

      <div className="form-item">
        <label htmlFor="dateOfBirth">Date Of Brith</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
        <span className="errorMessage">{formik.errors.dateOfBirth}</span>
      )}

      <div className="form-item">
        <label htmlFor="avata">Avata</label>
        <div className="avataGroup">
          {customerAvatas.map((url, i) => (
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <span className="errorMessage">{formik.errors.confirmPassword}</span>
      )}

      <div className="form-item">
        <label htmlFor="phone">Phone</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.errors.phone && formik.touched.phone && (
        <span className="errorMessage">{formik.errors.phone}</span>
      )}

      <div className="form-item">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.errors.address && formik.touched.address && (
        <span className="errorMessage">{formik.errors.address}</span>
      )}

      <div className="submitBtn">
        <button className="saveBtn" type="button" onClick={formSubmit}>
          Save
        </button>
      </div>
    </>
  );
}

export default RegisterCustomer;
