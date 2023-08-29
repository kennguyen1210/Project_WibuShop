import { Link } from "react-router-dom";

function BuySuccess() {
  return (
    <div className="buySuccess">
      <div className="content">
        <h5>Congratulations Buy Success</h5>
        <p>
          Thanks for purchasing our products. Invoice will be sent to {} your
          email.
        </p>
        <p>
          We hope you have a great shopping experience in our store. Sincerely
          thank.
        </p>
        <Link to="/home">Back to Home Page</Link>
      </div>
    </div>
  );
}

export default BuySuccess;
