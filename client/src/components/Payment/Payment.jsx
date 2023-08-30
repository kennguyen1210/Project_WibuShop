/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import CustomerInfo from "./CustomerInfo";
import { toast } from "react-toastify";
import "./style.css";
function Payment() {
  let [option, setOption] = useState(1);
  const notify = () =>
    toast.info("Cart is empty. By some thing !!!", {
      position: "top-center",
      autoClose: 2000,
    });
  const formikRef1 = useRef(null);
  const formikRef3 = useRef(null);
  const { login, loginCheck, loginType } = useSelector((state) => state.login);
  const { cartNumber } = useSelector((state) => state.carts);
  const handleChangeOption = (e) => {
    setOption(+e.target.value);
    formikRef1.current.resetForm();
  };
  let navidate = useNavigate();
  const [subValue1, setSubValue1] = useState({});
  const [subValue2, setSubValue2] = useState({ ...login });

  const validationSchema1x = Yup.object().shape({
    bank: Yup.string().required("Select a bank!"),
    accountName: Yup.string()
      .min(8, "Your account name be at least 15 characters!")
      .required("Account Name is required"),
    accountNumber: Yup.string()
      .matches(/^\d+$/, "Account Number must be a string of only numbers")
      .min(9, "Account number be at least 9 characters!")
      .max(14, "Account number must be under 14 characters!")
      .required("Account Number is required!"),
  });
  const validationSchema1xx = Yup.object().shape({
    cardType: Yup.string().required("Select Card Type!"),
    cardNumber: Yup.string()
      .matches(/^\d+$/, "Card Number must be a string of only numbers")
      .length(16, "Card Number must have exactly 16 characters")
      .required("Card Number is required!"),
    cardName: Yup.string()
      .min(15, "Card name be at least 15 characters!")
      .required("Card Name is required"),
    memberSince: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/[0-9]{4}$/, "Date have format like MM/YYYY")
      .required("Member since is required"),
    ValidThru: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/[0-9]{4}$/, "Date have format like MM/YYYY")
      .test(
        "is-after-start-date",
        "ValidThru must be after Member since",
        function (value) {
          const { memberSince } = this.parent;
          if (memberSince && value) {
            const [startMonth, startYear] = memberSince.split("/");
            const [endMonth, endYear] = value.split("/");
            const memberSinceObj = new Date(
              parseInt(startYear),
              parseInt(startMonth) - 1
            );
            const endDateObj = new Date(
              parseInt(endYear),
              parseInt(endMonth) - 1
            );
            return endDateObj > memberSinceObj;
          }
          return true;
        }
      )
      .required("ValidThru is required"),
  });
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema2 = Yup.object().shape({
    fullname: Yup.string()
      .min(8, "Your fullname must be at least 8 characters!")
      .max(25, "Your fullname must be under 25 characters!")
      .required("Full Name is required"),
    sex: Yup.string().required("Thís field is required!"),
    dateOfBirth: Yup.date()
      .max(
        formatDate(new Date()),
        `Your date of birth must be under ${formatDate(new Date())}`
      )
      .required("Date of brith is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
  });

  //submit form
  const handleSubmit = () => {
    formikRef1.current.handleSubmit();
    formikRef3.current.handleSubmit();

    console.log({ payment: { ...subValue1 }, ...subValue2 });
    if (cartNumber) {
      navidate("/buySuccess");
    } else {
      notify();
    }
  };

  return (
    <div className="Payment">
      <h4 className="page_title">Payment</h4>
      <div className="line"></div>
      <div className="form-payment">
        <div className="form-left">
          <h5>Payment Info</h5>
          <div className="form-item" style={{ marginBottom: "20px" }}>
            <label htmlFor="">Do you want to pay by ?</label>
            <select className="bank_option" onChange={handleChangeOption}>
              <option value="1">Bank</option>
              <option value="2">Credit Card</option>
            </select>
          </div>
          <Formik
            innerRef={formikRef1}
            initialValues={
              option === 1
                ? { bank: "", accountName: "", accountNumber: "" }
                : {
                    cardType: "",
                    cardNumber: "",
                    cardName: "",
                    memberSince: "",
                    ValidThru: "",
                  }
            }
            validationSchema={
              option === 1 ? validationSchema1x : validationSchema1xx
            }
            onSubmit={(values, { resetForm }) => {
              setSubValue1({ ...values });
              resetForm();
            }}
          >
            <Form>
              {option === 1 ? (
                <div>
                  <div className="form-item">
                    <label>Bank:</label>
                    <div className="input-item">
                      <Field as="select" name="bank">
                        <option value="">Select A Bank</option>
                        <option value="VCB">Vietcom Bank</option>
                        <option value="BIDV">BIDV Bank</option>
                        <option value="VTB">Vietin Bank</option>
                      </Field>

                      <ErrorMessage
                        name="bank"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label>AccountName:</label>
                    <div className="input-item">
                      <Field type="text" name="accountName" />
                      <ErrorMessage
                        name="accountName"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label>AccountNumber:</label>
                    <div className="input-item">
                      <Field type="text" name="accountNumber" />
                      <ErrorMessage
                        name="accountNumber"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="form-item">
                    <label>Payment</label>
                    <div className="input-item">
                      <Field name="cardType" as="select">
                        <option value="">Select Card Type</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                        <option value="master">Visa Card</option>
                        <option value="visa">Master Card</option>
                      </Field>
                      <ErrorMessage
                        name="cardType"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label>Card Name</label>
                    <div className="input-item">
                      <Field
                        type="text"
                        name="cardName"
                        placeholder="VD: Nguyen Van A"
                      />
                      <ErrorMessage
                        name="cardName"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className="input-item">
                      <Field
                        type="text"
                        name="cardNumber"
                        placeholder="VD: 01234567890"
                      />
                      <ErrorMessage
                        name="cardNumber"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label>Member Since</label>
                    <div className="input-item">
                      <Field
                        type="datetime"
                        name="memberSince"
                        placeholder="VD: 01/2023"
                      />
                      <ErrorMessage
                        name="memberSince"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="ValidThru">Valid Thru</label>
                    <div className="input-item">
                      <Field
                        type="datetime"
                        name="ValidThru"
                        placeholder="VD: 01/2028"
                      />
                      <ErrorMessage
                        name="ValidThru"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ textAlign: "end" }}>
                <button
                  type="reset"
                  className="btn btn-warning"
                  style={{ marginRight: "40px" }}
                >
                  Reset
                </button>
              </div>
            </Form>
          </Formik>

          {/* <Formik
            innerRef={formikRef2}
            initialValues={{
              cardType: "",
              cardNumber: "",
              cardName: "",
              memberSince: "",
              ValidThru: "",
            }}
            validationSchema={validationSchema1xx}
            onSubmit={(values, { resetForm }) => {
              console.log("credit", values);
              setSubValue1({ ...values });
              resetForm();
            }}
          ></Formik> */}
        </div>
        <div className="form-right">
          <Formik
            innerRef={formikRef3}
            initialValues={{
              fullname: "",
              sex: "",
              dateOfBirth: "",
              email: "",
              address: "",
              phone: "",
            }}
            validationSchema={validationSchema2}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              setSubValue2({ ...values });
              resetForm();
            }}
          >
            <Form>
              {loginCheck && loginType === "customer" ? (
                <CustomerInfo login={login} />
              ) : (
                <>
                  <h5>Customer Info</h5>
                  <div className="form-item">
                    <label htmlFor="fullname">Fullname</label>
                    <div className="input-item">
                      <Field type="text" id="fullname" name="fullname" />
                      <ErrorMessage
                        name="fullname"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="">Sex</label>
                    <label>
                      <Field
                        type="radio"
                        name="sex"
                        value="male"
                        style={{ marginRight: "10px" }}
                      />
                      Male
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="sex"
                        value="female"
                        style={{ marginRight: "10px" }}
                      />
                      Female
                    </label>
                    <div>
                      <ErrorMessage
                        name="sex"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>

                  <div className="form-item">
                    <label htmlFor="dateOfBirth">Day Of Birth</label>
                    <div className="input-item">
                      <Field type="date" id="dateOfBirth" name="dateOfBirth" />
                      <ErrorMessage
                        name="dateOfBirth"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="email">Email</label>
                    <div className="input-item">
                      <Field type="email" id="email" name="email" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-item">
                      <Field type="phone" id="phone" name="phone" />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="address">Address</label>
                    <div className="input-item">
                      <Field type="text" id="address" name="address" />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="errorMessage"
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <button
                      type="reset"
                      className="btn btn-warning"
                      style={{ marginRight: "40px" }}
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}
            </Form>
          </Formik>
        </div>
      </div>
      <div className="submitBtn" style={{ marginTop: "20px" }}>
        <button type="button" onClick={handleSubmit}>
          Pay
        </button>
      </div>
    </div>
  );
}

export default Payment;
