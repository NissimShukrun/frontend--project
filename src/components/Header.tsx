import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

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
