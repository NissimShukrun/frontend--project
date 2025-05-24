import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProductById } from "../../slices/productSlice";
import { addToCart } from "../../slices/cartSlice";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.product);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleBuy = () => {
    dispatch(addToCart({ product, quantity }));
    navigate("/cart");
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>
        Here is more details for the product Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Aspernatur, earum fuga, quisquam modi
        officiis cum magni itaque, nostrum corrupti adipisci id recusandae
        molestias placeat architecto dolorum nisi repellat! Quia, cupiditate.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur,
        earum fuga, quisquam modi officiis cum magni itaque, nostrum corrupti
        adipisci id recusandae molestias placeat architecto dolorum nisi
        repellat! Quia, cupiditate.
      </p>
      <div>
        <input
          type="number"
          name="number"
          min={1}
          placeholder="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button type="button" onClick={handleBuy}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
