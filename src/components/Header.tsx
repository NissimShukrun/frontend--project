import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <nav className="header-navbar">
        {user && <span className="hello-nav">Hello, {user.name}</span>}
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/products" className="links">
          Products
        </Link>
        <Link to="/cart" className="links">
          Cart
        </Link>
        {!user && (
          <>
            <Link to="/register" className="links">
              Register
            </Link>
            <Link to="/login" className="links">
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to="/orders" className="links">
              My Orders
            </Link>
            <Link to="/logout" className="links">
              Logout
            </Link>
          </>
        )}
        {user?.isAdmin === "admin" && (
          <>
            <Link to="/admin/products-form" className="links">
              Products Changes
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
