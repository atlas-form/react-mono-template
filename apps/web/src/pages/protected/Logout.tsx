import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "@/store/authSlice";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 清除 Redux 和本地存储
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    // 跳转回登录页
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return <p>Logging out...</p>;
}
