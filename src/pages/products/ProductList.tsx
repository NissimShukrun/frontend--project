import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts } from "../../slices/productSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [count, setCount] = useState<{ [id: string]: number }>({});

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
    const quantity = count[id] || 1;
    alert(`Buying ${quantity} of product ${id}`);
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
