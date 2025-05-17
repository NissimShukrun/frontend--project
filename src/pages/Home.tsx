import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Electronicer</h1>

      <p>
        Your one-stop shop for all electronic products and accessories. At
        Electronicer, we provide high-quality gadgets, home appliances, and the
        latest tech at unbeatable prices. Whether you're upgrading your setup or
        looking for a gift, we've got something for everyone.
      </p>

      <p>
        Explore a wide range of items – from smartphones and headphones to
        kitchen appliances and smart home devices. Our products are carefully
        selected to ensure you get the best value and performance.
      </p>

      <Link to="/products">
        <button>Browse Products</button>
      </Link>
    </div>
  );
};

export default Home;
