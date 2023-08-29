import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function NavbarCustomer() {
  const { cartNumber } = useSelector((state) => state.carts);
  return (
    <>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Figure
        </Link>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="/result2/figure/all">
              All Figure
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/figure/onepiece">
              One Piece
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/figure/bleach">
              Bleach
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/figure/naruto">
              Naruto
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/figure/kimetsuNoYaiba">
              Kimetsu No Yaiba
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          T-Shirt
        </Link>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="/result2/T-shirt/all">
              All T-Shirt
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/T-shirt/onepiece">
              One Piece
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/T-shirt/bleach">
              Bleach
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/result2/T-shirt/naruto">
              Naruto
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/result2/T-shirt/kimetsuNoYaiba"
            >
              Kimetsu No Yaiba
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/payment">
          <i className="bi bi-credit-card"></i>
          Payment Page
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/cart">
          <i className="bi bi-cart"></i>
          Cart
          {cartNumber > 0 ? (
            <button className="cartNumber">{cartNumber}</button>
          ) : (
            <></>
          )}
        </Link>
      </li>
    </>
  );
}

export default NavbarCustomer;
