import axios from "axios";
import { useCallback, useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3001/api";
const token = localStorage.getItem("access_token");

export const GetAllCodeReviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Use null for no error initially

  const fetchCodeReviews = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get("/code-reviews/", headers);
      setLoading(false);
      setData(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCodeReviews();
  }, []);

  const mutate = () => {
    fetchCodeReviews();
  };

  return { data, loading, error, mutate };
};

export const GetSingleCodeReview = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Use null for no error initially

  const fetchCodeReview = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/code-reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setLoading(false);
      setData(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCodeReview();
  }, []);

  const mutate = () => {
    fetchCodeReview();
  };

  return { data, loading, error, mutate };
};
