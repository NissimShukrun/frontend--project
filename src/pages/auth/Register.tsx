import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchRegisterUser } from "../../slices/authSlice";
import { useState } from "react";

const Register = () => {
  const dispatch = useAppDispatch();
  const { user, message } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      fetchRegisterUser({
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );
    setIsRegistered(true);
  };

  return (
    <div>
      <h2>Register</h2>

      {isRegistered ? (
        <div>
          {message && <p>{message}</p>}
          {user && <p>{user.name}</p>}
          {user && <p>{user.email}</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
