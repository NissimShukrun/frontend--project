import { useAppSelector, useAppDispatch } from "../../store/store";
import { removeFromCart, clearCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product._id}>
            {product.name} - {quantity} x ${product.price} = $
            {product.price * quantity}
            <button onClick={() => dispatch(removeFromCart(product._id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
      <button onClick={() => navigate("/checkout")}>Buy</button>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
};

export default Cart;
