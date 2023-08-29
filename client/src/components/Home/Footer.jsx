function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h5>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwDLn8LfOYoBq50-0E3VrxjWDr9tv7uJ7_pQ&usqp=CAU"
            alt="logo"
          />
          Wibu Shop
        </h5>
        <p>
          Wibu Shop sells genuine, good-quality products and is always focused
          on the interests of consumers
        </p>
      </div>
      <div className="footer-item">
        <h5>Contact</h5>
        <p>Company: ACB Company</p>
        <p>Hotline: 012-346-789</p>
        <p>Email: abc@gmail.com</p>
        <p>Address: ABC strees DEF tower</p>
      </div>
      <div className="footer-item">
        <h5>Sosical media</h5>
        <p>
          <span>
            <i className="bi bi-facebook"></i>
          </span>{" "}
          <span>
            <i className="bi bi-instagram"></i>
          </span>{" "}
          <span>
            <i className="bi bi-twitter"></i>
          </span>
          <span>
            <i className="bi bi-tiktok"></i>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
