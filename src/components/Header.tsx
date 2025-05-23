import { Link, useSearchParams } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {!user && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {user && (
          <>
            <span>Hello, {user.name}</span>
            <Link to="/orders">My Orders</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
