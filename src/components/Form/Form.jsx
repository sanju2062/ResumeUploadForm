import { useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    higher_qualification: "",
    email: "",
    descripition: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    console.log("submit clicked");
    event.preventDefault(); // Prevent default form submission behavior
    if (!selectedFile) {
      alert("Please select a PDF file");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("fullname", formData.fullname);
    submissionData.append("age", formData.age);
    submissionData.append(
      "higher_qualification",
      formData.higher_qualification
    );
    submissionData.append("email", formData.email);
    submissionData.append("descripition", formData.descripition);
    submissionData.append("resume", selectedFile); // Add the file

    await axios
      .post(
        "https://resume-upload-api.vercel.app/api/savedata",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": true,
          },
        }
      )
      .then((response) => {
        if (response.status === 200)
          alert(
            "Data and Pdf upload successfully. Please wait 2-3 working days for response from our experts."
          );
        else alert("There was an error uploading the form. Please try again.");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className={styles.formHeading}>
        <h2>Fill Form to get in touch</h2>
      </div>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Enter Your Full Name"
        />
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter Your Age"
        />
        <input
          type="text"
          name="higher_qualification"
          value={formData.higher_qualification}
          onChange={handleChange}
          placeholder="Enter Your Higest Qualification"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
        />
        <input
          type="text"
          name="descripition"
          value={formData.descripition}
          onChange={handleChange}
          placeholder="Write About Yourself"
        />
        <div className={styles.resumeInputLabel}>Upload Your Resume Here</div>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
