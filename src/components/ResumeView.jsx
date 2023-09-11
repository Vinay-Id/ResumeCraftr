import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:3030";

function ResumeView() {
  const { id } = useParams();

  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    axios
      .get(`${URL}/resumes/${id}`)
      .then((response) => {
        setResumeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resume:", error);
      });
  }, [id]);
  console.log(resumeData);

  return (
    <div className="container">
      <h2>Resume Details</h2>
      <div>
        <h3>Profile</h3>
        <strong>Name:</strong> {resumeData.name} <br />
        <strong>Email:</strong> {resumeData.email}
        <br />
        <strong>CurrentDesignation:</strong> {resumeData.currentDesignation}
        <br />
        <strong>Experience:</strong> {resumeData.experience}{" "}
        {resumeData.experience > 1 ? "Years" : "Year"}
        <br />
        <strong>Location:</strong> {resumeData.location}
        <br />
        <strong>PhoneNo:</strong> {resumeData.phoneNo}
        <br />
        {resumeData.website && (
          <>
            <strong>Website: </strong>{resumeData.website}
          </>
        ) }
      </div>
      <div>
        <h3>About</h3>
        {resumeData.aboutMe}
      </div>

      {resumeData.projects && resumeData.projects.length > 0 && (
        <div>
          <h3>Projects</h3>
          {resumeData.projects.map((project, index) => (
            <div key={index}>
              <strong>Title:</strong> {project.title}
              <br />
              <strong>Tenure:</strong> {project.tenure}
              <br />
              <strong>Description:</strong> {project.description}
              <br />
            </div>
          ))}
        </div>
      )}

      {resumeData.academics && resumeData.academics.length > 0 && (
        <div>
          <h3>Education</h3>
          {resumeData.academics.map((academic, index) => (
            <div key={index}>
              <strong>Title:</strong> {academic.title}
              <br />
              <strong>Year:</strong> {academic.year}
              <br />
              <strong>Description:</strong> {academic.description}
              <br />
            </div>
          ))}
        </div>
      )}

      {resumeData.professionalExperience &&
        resumeData.professionalExperience.length > 0 && (
          <div>
            <h3>Experience</h3>
            {resumeData.professionalExperience.map((experience, index) => (
              <div key={index}>
                <strong>Designation:</strong> {experience.designation}
                <br />
                <strong>Organization:</strong> {experience.organization}
                <br />
                <strong>Tenure:</strong> {experience.tenure}
                <br />
                <strong>Location:</strong> {experience.location}
                <br />
                <strong>Description:</strong> {experience.description}
                <br />
              </div>
            ))}
          </div>
        )}

      <div>
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <h3>Skills</h3>
            {resumeData.skills.map((skill, index) => (
              <span key={index}>
                {skill.skillName}
                {"  "}
                {"⭐".repeat(skill.skillRating)}
              </span>
            ))}
          </div>
        )}
        <div className="btn-div">
          <Link className="editBtn" to={`/`}>
            Home
          </Link>
          <Link className="editBtn" to={`/edit/${id}`}>
            Edit Resume
          </Link>
          <Link className="deleteBtn" to={`/delete/${id}`}>
            Delete Resume
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResumeView;
