import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductList from "./pages/products/ProductList";
import ProductDetail from "./pages/products/ProductDetail";
import AdminProductForm from "./pages/products/AdminProductForm";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import OrderSuccess from "./pages/cart/OrderSuccess";
import OrderHistory from "./pages/orders/OrderHistory";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin/products" element={<AdminProductForm />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="/orders" element={<OrderHistory />} />

          <Route path="/admin/users" element={<ManageUsers />} />
          <Route
            path="/admin/products-management"
            element={<ManageProducts />}
          />
          <Route path="/admin/orders" element={<ManageOrders />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
