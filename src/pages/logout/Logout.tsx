import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { logoutUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
