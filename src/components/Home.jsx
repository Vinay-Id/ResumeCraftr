import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
const URL = "http://localhost:3030";

function ResumeList() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/resumes`)
      .then((response) => {
        setResumes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
      });
  }, []);

  const handleDelete = (id) => {

    axios
      .delete(`${URL}/resumes/${id}`)
      .then(() => {
        setResumes((prevResumes) =>
          prevResumes.filter((resume) => resume.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting resume:", error);
      });
  };

  return (
    <div className="container">
      <div>
        <h2>Resume Craftr</h2>
        <ul>
          {resumes.map((resume) => (
            <li key={resume.id}>
              <Link to={`/view/${resume.id}`}>{resume.name}</Link>
              <span>
                <Link  to={`/edit/${resume.id}`} className="editBtn">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(resume.id)}
                  className="deleteBtn"
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/create" id="btn">
          Create New Resume
        </Link>
      </div>
    </div>
  );
}

export default ResumeList;
