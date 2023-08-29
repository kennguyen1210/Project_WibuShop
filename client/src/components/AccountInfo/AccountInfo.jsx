/* eslint-disable no-unused-vars */

import { useState } from "react";
import EditAccount from "./EditAccount";
import { useDispatch } from "react-redux";
import { setEdit } from "../../redux/EditSlice";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
function AccountInfo(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { type, fullname, sex, email, phone, address, cart, avata, account } =
    props;

  const handleShow = () => {
    dispatch(setEdit(account));
    navigate("/edit");
  };
  return (
    <div className="AccountInfo" id="AccountInfo">
      <h5>Account Info</h5>
      <hr />
      <div className="content_info">
        <p>
          <img src={avata} alt="avata" />
        </p>
        <p>
          Account Type: <span className="content_info_item">{type}</span>
        </p>
        <p>
          FullName : <span className="content_info_item">{fullname}</span>
        </p>
        {sex ? (
          <p>
            Sex: <span className="content_info_item">{sex}</span>
          </p>
        ) : (
          <></>
        )}
        <p>
          Email: <span className="content_info_item">{email}</span>
        </p>
        {phone ? (
          <p>
            Phone: <span className="content_info_item">{phone}</span>
          </p>
        ) : (
          <></>
        )}
        {address ? (
          <p>
            Address: <span className="content_info_item">{address}</span>
          </p>
        ) : (
          <></>
        )}
        {cart ? (
          <p>
            Cart: <span className="content_info_item">{cart}</span>
          </p>
        ) : (
          <></>
        )}
      </div>
      <div style={{ textAlign: "end" }}>
        <button type="button" className="editBtn" onClick={handleShow}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default AccountInfo;
