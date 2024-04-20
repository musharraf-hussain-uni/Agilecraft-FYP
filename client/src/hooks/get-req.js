import {
  useEffect,
  useState
} from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
const token = localStorage.getItem("access_token");

export const useGetAllRequirement = () => {
  const [requirements, setRequirements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequirement = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await axios.get("/req-gathering/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequirements(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchRequirement();
  }, []);

  return {
    requirements,
    error,
    loading
  };
};

export const useGetRequirement = (id) => {
  const [requirement, setRequirement] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchSingleRequirement = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await axios.get(`/req-gathering/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequirement(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    FetchSingleRequirement();
  }, [id]);

  return {
    requirement,
    error,
    loading
  };
};