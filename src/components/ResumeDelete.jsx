import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:3030";

function ResumeDelete() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    axios
      .delete(`${URL}/resumes/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting resume:", error);
      });
  };

  return (
    <div className="container">
      <h2>Delete Resume</h2>
      <div>
        <h4>Are you sure you want to delete the resume?</h4>

        <div className="btn-div">
          <button className="deleteBtn" onClick={handleDelete}>Confirm Delete</button>
          <Link className="editBtn" to={`/view/${id}`}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default ResumeDelete;
