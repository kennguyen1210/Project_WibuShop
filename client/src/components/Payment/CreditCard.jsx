function CreditCard() {
  return (
    <div className="CreditCard">
      <div className="card_info">
        <label htmlFor="card_option">Payment</label>
        <select name="bank" id="card_option">
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
          <option value="master">Visa Card</option>
          <option value="visa">Master Card</option>
        </select>
      </div>
      <div className="card_info">
        <label htmlFor="cardName">Card Name</label>
        <input
          type="text"
          name="cardName"
          id="cardName"
          placeholder="VD: Nguyen Van A"
        />
      </div>
      <div className="card_info">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          placeholder="VD: 01234567890"
        />
      </div>
      <div className="card_info">
        <label htmlFor="memberSince">Member Since</label>
        <input
          type="datetime"
          name="memberSince"
          id="memberSince"
          placeholder="VD: 01/2023"
        />
      </div>
      <div className="card_info">
        <label htmlFor="ValidThru">Valid Thru</label>
        <input
          type="datetime"
          name="ValidThru"
          id="ValidThru"
          placeholder="VD: 01/2028"
        />
      </div>
    </div>
  );
}

export default CreditCard;
