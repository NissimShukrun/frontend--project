import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts } from "../../slices/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [count, setCount] = useState<{ [id: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChangeCount = (id: string, value: string) => {
    setCount((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const handleBuy = (id: string) => {
    const product = products.find((p) => p._id === id);
    const quantity = count[id] || 1;
    if (product) {
      dispatch(addToCart({ product, quantity }));
      navigate("/cart");
    }
  };

  return (
    <div>
      <h1>Products:</h1>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price}
            <p>{p.description}</p>
            <input
              type="number"
              name="number"
              min={1}
              placeholder="1"
              onChange={(e) => handleChangeCount(p._id, e.target.value)}
            />
            <button type="button" onClick={() => handleBuy(p._id)}>
              Buy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
