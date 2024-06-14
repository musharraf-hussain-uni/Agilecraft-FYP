import axios from "axios";
import { useCallback, useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3001/api"; // Set base URL
const token = localStorage.getItem("access_token");

export const GetAllBugTracks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBugTracks = useCallback(async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get("/bug-tracking/", { headers });
      setLoading(false);
      setData(response.data.getAllBug);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBugTracks();
  }, [fetchBugTracks]);

  const mutate = {
    fetchBugTracks,
  };

  return { data, loading, error, mutate };
};

export const GetBugTrack = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBugTrack = useCallback(async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`/bug-tracking/${id}`, { headers });
      setLoading(false);
      setData(response.data.bug);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBugTrack();
  }, [fetchBugTrack]);

  const mutate = {
    fetchBugTrack,
  };

  return { data, loading, error, mutate };
};
