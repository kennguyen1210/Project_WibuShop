/* eslint-disable react/prop-types */
function CustomerInfo(props) {
  const { info, method } = props;

  const handleReset = () => {
    method();
  };
  return (
    <div className="customerInfo">
      <span className="exitBtn" onClick={handleReset}>
        <i className="bi bi-x-lg"></i>
      </span>
      <h4>Customer Info</h4>
      <div className="content">
        <p style={{ textAlign: "center" }}>
          <img src={info.avata} alt="avata" style={{ width: "90px" }} />
        </p>
        <p className="item">
          <span style={{ marginRight: "20px" }}>FullName: </span>
          <span style={{ color: "#673593" }}>{info.fullname}</span>
        </p>
        <p className="item">
          <span style={{ marginRight: "20px" }}>Sex: </span>
          <span style={{ color: "#673593" }}>{info.sex}</span>
        </p>
        <p className="item">
          <span style={{ marginRight: "20px" }}>Email: </span>
          <span style={{ color: "#673593" }}>{info.email}</span>
        </p>
        <p className="item">
          <span style={{ marginRight: "20px" }}>Phone: </span>
          <span style={{ color: "#673593" }}>{info.phone}</span>
        </p>
        <p className="item">
          <span style={{ marginRight: "20px" }}>Address: </span>
          <span style={{ color: "#673593" }}>{info.address}</span>
        </p>
      </div>
    </div>
  );
}

export default CustomerInfo;
