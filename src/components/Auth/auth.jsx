import { useState } from "react";
import styles from "./Auth.module.css";
export default function Auth({ credentials, setIsAuth }) {
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (
      credentials.userName === formData.userName &&
      credentials.passWord === formData.passWord
    ) {
      setIsAuth(true);
    } else {
      alert("Enter Correct Username and Password");
    }
  };
  return (
    <div className={styles.authCon}>
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="Enter Username"
      />
      <input
        type="text"
        name="passWord"
        value={formData.passWord}
        onChange={handleChange}
        placeholder="Enter Password"
      />
      <input type="submit" className="sumbit" onClick={handleSubmit} />
    </div>
  );
}
