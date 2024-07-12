import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3001/api";

export const CodeReviewContext = createContext(null);

export default function CodeReviewContextProvider({ children }) {
  const AddReviews = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/code-reviews/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Reviews added successfully!");
      console.log(response);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const DeleteReview = async (id) => {
    try {
      const { data } = await axios.delete(`/code-reviews/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Review deleted successfully!");
      console.log(data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const UpdateReview = async (id, status) => {
    console.log(status);
    try {
      const { data } = await axios.put(`/code-reviews/update/${id}`, status, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Review updated successfully!");
      console.log(data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const value = {
    AddReviews,
    DeleteReview,
    UpdateReview,
  };
  return (
    <CodeReviewContext.Provider value={value}>
      {children}
    </CodeReviewContext.Provider>
  );
}
