import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts } from "../../slices/productSlice";

const AdminProductForm = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Products:</h1>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price}
            <p>{p.description}</p>
            <div>
              <button type="button">Edit ✏️</button>
              <button type="button">Delete 🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductForm;
