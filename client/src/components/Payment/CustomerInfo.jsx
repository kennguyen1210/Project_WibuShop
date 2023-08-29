/* eslint-disable react/prop-types */
import "./style.css";
function CustomerInfo(props) {
  const { login } = props;
  return (
    <div className="customer_info">
      <h6>Customer Info</h6>
      <div className="info_item">
        <span>Fullname: </span>
        <span className="info_span">{login.fullname}</span>
      </div>
      <div className="info_item">
        <span>Sex: </span>
        <span className="info_span">{login.sex}</span>
      </div>
      <div className="info_item">
        <span>Day Of Birth: </span>
        <span className="info_span">{login.dateOfBrith}</span>
      </div>
      <div className="info_item">
        <span>Email: </span>
        <span className="info_span">{login.email}</span>
      </div>
      <div className="info_item">
        <span>Phone Number: </span>
        <span className="info_span">{login.phone}</span>
      </div>
      <div className="info_item">
        <span>Address: </span>
        <span className="info_span">{login.address}</span>
      </div>
    </div>
  );
}

export default CustomerInfo;
