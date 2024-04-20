import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    if (!isLogged) {
      // Redirect to login if not logged in
      navigate("/login", { replace: true });
    } else {
      setLoading(false); // Mark loading as complete
    }
  }, [isLogged, navigate]);

  return loading ? null : <>{children}</>; // Render children only after loading
};

export default ProtectedRoutes;
