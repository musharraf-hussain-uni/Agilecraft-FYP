import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export default function AuthContextProvider() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setIsLogged(true);
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("access_token", data.token);
      setIsLogged(true);
      navigate("/dashboard");
      toast.success(`User logged in succesfully`);
    } catch (error) {
      console.log("Error during login:", error.response.data.message);
      toast.error(`Sorry! ${error.response.data.message}`);
    }
  };

  const register = async (formData) => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("User Created successfully");
      navigate("/dashboard/user");
    } catch (error) {
      console.log("Error during registration:", error);
      toast.error("Something Went Wrong. Try again");
    }
  };
  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/logout"
      );
      localStorage.removeItem("access_token");
      setIsLogged(false);
      navigate("/", { replace: true });
      toast.success(`${data.message}!`);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    isLogged,
    login,
    register,
    logout,
    setIsLogged,
  };

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
}
