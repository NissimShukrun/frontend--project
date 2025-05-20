import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchLoginUser } from "../../slices/authSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const { user, message } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email: form.email, password: form.password }));
    setIsLogin(true);
  };

  return (
    <div>
      <h2>Login</h2>

      {isLogin ? (
        <div>
          {message && <p>{message}</p>}
          {user && <p>{user.name}!</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
