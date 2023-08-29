import { Link } from "react-router-dom";
function NavbarProduct() {
  return (
    // <nav className="navbar navbar-expand-lg bg-body-tertiary navbar_content">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" to="/product">
    //       <i className="bi bi-archive"></i>Product Manager
    //     </Link>
    //     <Link className="navbar-brand" to="/admin">
    //       <i className="bi bi-file-earmark-person"></i>Admin Manager
    //     </Link>
    //     <Link className="navbar-brand" to="/customer">
    //       <i className="bi bi-person-circle"></i>Customer Manager
    //     </Link>
    //   </div>
    // </nav>
    <>
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/product">
          <i className="bi bi-archive"></i>Product Manager
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/admin">
          <i className="bi bi-file-earmark-person"></i>Admin Manager
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/customer">
          <i className="bi bi-person-circle"></i>Customer Manager
        </Link>
      </li>
    </>
  );
}

export default NavbarProduct;
