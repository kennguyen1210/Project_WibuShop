/* eslint-disable no-unused-vars */
import { useState } from "react";
import RegisterCustomer from "./RegisterCustomer";
import RegisterAdmin from "./RegisterAdmin";
function Register() {
  const [accountType, setAccountType] = useState("customer");
  const handleCheckChange = (e) => {
    console.log(e.target.value);
    setAccountType(e.target.value);
  };
  return (
    <div className="Register">
      <form action="">
        <h6>REGISTER</h6>
        <div className="form-item">
          <label htmlFor="accountType">Account Type</label>
          <select
            name="accountType"
            id="accountType"
            onChange={handleCheckChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {accountType === "admin" ? (
          <RegisterAdmin type={accountType === "admin" ? "admin" : ""} />
        ) : (
          <RegisterCustomer
            type={accountType === "customer" ? "customer" : ""}
          />
        )}
      </form>
    </div>
  );
}

export default Register;
