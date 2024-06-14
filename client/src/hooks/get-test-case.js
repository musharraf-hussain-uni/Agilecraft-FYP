import axios from "axios";
import { useCallback, useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3001/api";
const token = localStorage.getItem("access_token");

export const GetAllTestCases = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Use null for no error initially

  const token = localStorage.getItem("access_token");

  const fetchTestCases = useCallback(async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get("/test/", { headers });
      setData(response.data.test);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTestCases();
  }, [fetchTestCases]); // Dependency on useCallback-wrapped function

  return { data, loading, error, refetch: fetchTestCases }; // Rename to refetch
};

export const GetTestCase = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");

  const fetchTestCase = useCallback(async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`/test/${id}`, { headers });
      setData(response.data.test);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTestCase();
  }, [fetchTestCase]);

  return { data, loading, error, refetch: fetchTestCase };
};
