/* eslint-disable react/prop-types */
function Bank(props) {
  return (
    <div className="bank">
      <div className="bank_info">
        <label htmlFor="bank">Bank</label>
        <select
          name="bank"
          id="bank"
          onChange={props.method}
          value={props.bank}
        >
          <option value="VCB">VietcomBank</option>
          <option value="BIDV">BIDV Bank</option>
          <option value="MB">MB bank</option>
        </select>
      </div>

      <div className="bank_info">
        <label htmlFor="accountName">Account Name</label>
        <input
          type="text"
          name="accountName"
          id="accountName"
          placeholder="VD: Nguyen Van A"
          value={props.bankName}
          onChange={props.method}
        />
      </div>
      <div className="bank_info">
        <label htmlFor="accountNumber">Account Number</label>
        <input
          type="text"
          name="accountNumber"
          id="accountNumber"
          placeholder="VD: 01234567890"
          value={props.bankNumber}
          onChange={props.method}
        />
      </div>
      {/* <div className="bank_info">
        <label htmlFor="memberSince">Member Since</label>
        <input
          type="date"
          name="memberSince"
          id="memberSince"
          placeholder="VD: 01/2023"
        />
      </div>
      <div className="bank_info">
        <label htmlFor="ValidThru">Valid Thru</label>
        <input
          type="date"
          name="ValidThru"
          id="ValidThru"
          placeholder="VD: 01/2028"
        />
      </div> */}
    </div>
  );
}

export default Bank;
