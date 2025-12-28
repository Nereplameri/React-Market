import { NavLink, useNavigate } from "react-router";
import Logo from "../img/Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const navigate = useNavigate();

  function returnToAuthenticate() {
    navigate("/authenticate");
  }

  return (
    <nav className="container" style={{ height: "10vh" }}>
      <div className="row bg-primary h-100">
        <div className="col-1 setFlexsMiddle">
          <div>
            <img src={Logo} alt="Logo" className="img-fluid" />
          </div>
        </div>
        <div className="col-9 d-flex">
          <nav className="navbar navbar-expand-sm">
            <NavLink to="/" className="Navlink">
              Ana Sayfa
            </NavLink>
            <NavLink to="/productList" className="Navlink">
              Ürünler
            </NavLink>
            <NavLink to="/freshProductList" className="Navlink">
              Manav Ürünleri
            </NavLink>
            <NavLink to="/BrandList" className="Navlink">
              Markalar
            </NavLink>
          </nav>
        </div>
        <div className="col-2">
          <div className="h-100">
            <button
              className="btn btn-primary w-100 h-100"
              onClick={returnToAuthenticate}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
