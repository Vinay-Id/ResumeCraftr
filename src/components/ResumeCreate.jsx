import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:3030";
function ResumeCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    currentDesignation: "",
    location: "",
    phoneNo: "",
    website: "",
    aboutMe: "",
    projects: [
      {
        title: "",
        tenure: "",
        url: "",
        description: "",
      },
    ],

    academics: [
      {
        title: "",
        year: "",
        description: "",
      },
    ],
    professionalExperience: [
      {
        designation: "",
        organization: "",
        tenure: "",
        location: "",
        description: "",
      },
    ],
    skills: [
      {
        skillName: "",
        skillRating: 1,
      },
    ],
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${URL}/resumes/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching resume:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const getFieldAndIndex = (name) => {
      const start = name.indexOf("[");
      const end = name.indexOf("]");
      if (start !== -1 && end !== -1 && start < end) {
        const fieldName = name.slice(0, start);
        const index = name.slice(start + 1, end);
        return [fieldName, index];
      }
      return [null, null];
    };

    const [fieldName, index] = getFieldAndIndex(name);

    if (fieldName && index !== null) {
      setFormData((prevFormData) => {
        const updatedField = [...prevFormData[fieldName]];
        const subfield = name.split(".")[1];
        updatedField[index][subfield] = value;
        return { ...prevFormData, [fieldName]: updatedField };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addEntry = (sectionName) => {
    setFormData({
      ...formData,
      [sectionName]: [...formData[sectionName], {}],
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          skillName: "",
          skillRating: 1,
        },
      ],
    });
  };

  const removeSkill = (index) => {
    const skills = [...formData.skills];
    skills.splice(index, 1);
    setFormData({
      ...formData,
      skills,
    });
  };

  const deleteEntry = (sectionName, index) => {
    const sectionData = [...formData[sectionName]];
    sectionData.splice(index, 1);
    setFormData({
      ...formData,
      [sectionName]: sectionData,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`${URL}/resumes/${id}`, formData)
        .then(() => {
          navigate(`/view/${id}`);
        })
        .catch((error) => {
          console.error("Error updating resume:", error);
        });
    } else {
      axios
        .post(`${URL}/resumes`, formData)
        .then((response) => {
          navigate(`/view/${response.data.id}`);
        })
        .catch((error) => {
          console.error("Error creating resume:", error);
        });
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Resume" : "Create Resume"}</h2>
      {/* <form> */}
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Profile</h3>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>Experience:</label>
          <input
            type="number"
            name="experience"
            required
            value={formData.experience}
            onChange={handleChange}
          />

          <label>Current Designation:</label>
          <input
            type="text"
            name="currentDesignation"
            required
            value={formData.currentDesignation}
            onChange={handleChange}
          />

          <label>Location:</label>
          <input
            type="text"
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <label>Phone No.:</label>
          <input
            type="tel"
            required
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />

          <label>Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />

          <label>About:</label>
          <textarea
            name="aboutMe"
            required
            value={formData.aboutMe}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Project</h3>
          {formData.projects.map((project, index) => (
            <div key={index}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  required
                  name={`projects[${index}].title`}
                  value={project.title}
                  onChange={handleChange}
                />

                <label>Tenure:</label>
                <input
                  type="text"
                  name={`projects[${index}].tenure`}
                  value={project.tenure}
                  onChange={handleChange}
                />

                <label>URL:</label>
                <input
                  type="text"
                  name={`projects[${index}].url`}
                  value={project.url}
                  onChange={handleChange}
                />

                <label>Description:</label>
                <textarea
                  name={`projects[${index}].description`}
                  value={project.description}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="deleteBtn"
                onClick={() => deleteEntry("projects", index)}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            className="editBtn"
            onClick={() => addEntry("projects")}
          >
            Add More
          </button>
        </div>
        <div>
          <h3>Education</h3>
          {formData.academics.map((academic, index) => (
            <div key={index}>
              <label>Title:</label>
              <input
                type="text"
                required
                name={`academics[${index}].title`}
                value={academic.title}
                onChange={handleChange}
              />
              <label>Year:</label>
              <input
                type="text"
                required
                name={`academics[${index}].year`}
                value={academic.year}
                onChange={handleChange}
              />
              <label>Description:</label>
              <textarea
                name={`academics[${index}].description`}
                value={academic.description}
                onChange={handleChange}
              />
              <button
                type="button"
                className="deleteBtn"
                onClick={() => deleteEntry("academics", index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="editBtn"
            onClick={() => addEntry("academics")}
          >
            Add More
          </button>
        </div>

        <div>
          <h3>Experience</h3>
          {formData.professionalExperience.map((exp, index) => (
            <div key={index}>
              <label>Designation:</label>
              <input
                type="text"
                required
                name={`professionalExperience[${index}].designation`}
                value={exp.designation}
                onChange={handleChange}
              />
              <label>Organization:</label>
              <input
                type="text"
                required
                name={`professionalExperience[${index}].organization`}
                value={exp.organization}
                onChange={handleChange}
              />
              <label>Tenure:</label>
              <input
                type="text"
                name={`professionalExperience[${index}].tenure`}
                value={exp.tenure}
                onChange={handleChange}
              />
              <label>Location:</label>
              <input
                type="text"
                name={`professionalExperience[${index}].location`}
                value={exp.location}
                onChange={handleChange}
              />
              <label>Description:</label>
              <textarea
                name={`professionalExperience[${index}].description`}
                value={exp.description}
                onChange={handleChange}
              />
              <button
                type="button"
                className="deleteBtn"
                onClick={() => deleteEntry("professionalExperience", index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="editBtn"
            onClick={() => addEntry("professionalExperience")}
          >
            Add More
          </button>
        </div>
        <div>
          <h3>Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index}>
              <label>Skill Name:</label>
              <input
                type="text"
                required
                name={`skills[${index}].skillName`}
                value={skill.skillName}
                onChange={handleChange}
              />
              <label>Skill Rating:</label>
              <select
                name={`skills[${index}].skillRating`}
                value={skill.skillRating}
                onChange={handleChange}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              <br />
              <br />
              <button
                type="button"
                className="deleteBtn"
                onClick={() => removeSkill(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button className="editBtn" type="button" onClick={addSkill}>
            Add More
          </button>
        </div>
        <div className="btn-div">
          <button className="editBtn" type="submit">
            {id ? "Save Changes" : "Create Resume"}
          </button>
          <button
            className="editBtn"
            onClick={() => (id ? navigate(`/view/${id}`) : navigate("/"))}
          >
            {id ? "Cancel Changes" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeCreate;
