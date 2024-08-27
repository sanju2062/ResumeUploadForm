import { useEffect, useState } from "react";
import styles from "./Responses.module.css";
import axios from "axios";

export default function Responses() {
  const [allData, setAllData] = useState([]);

  const fetchData = async (url) => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        return res;
      } else return console.log("Server Error");
    } catch (e) {
      console.log("Error", e);
    }
  };

  const DownloadPDF = (pdfBuffer) => {
    const uint8Array = new Uint8Array(pdfBuffer);

    // Convert the PDF buffer to a Blob
    const blob = new Blob([uint8Array], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.pdf"; // The filename for the download

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  useEffect(() => {
    console.log("useEffect working2");
    const getData = async () => {
      const res2 = await fetchData(
        "https://resume-upload-api.vercel.app/api/getdata"
      );
      if (res2.data.data) {
        setAllData(res2.data.data);
      }
    };
    getData();
  }, []);

  const handleOnClick = async (e, id) => {
    e.preventDefault();
    const res = await fetchData(
      `https://resume-upload-api.vercel.app/api/getresume/${id}`
    );
    if (res.data.resume.buffer.data) {
      const pdfBuffer = res.data.resume.buffer.data;
      console.log(pdfBuffer);
      DownloadPDF(pdfBuffer);
    }
  };

  return (
    <div className={styles.responseContainer}>
      {allData.length === 0 ? (
        <div className={styles.emptyData}>No Record Found</div>
      ) : (
        allData.map((item, index) => (
          <form key={index} className={styles.responseForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name:</label>
              <input
                type="text"
                value={item.fullname}
                className={styles.formInput}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Age:</label>
              <input
                type="text"
                value={item.age}
                className={styles.formInput}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Qualification:</label>
              <input
                type="text"
                value={item.higher_qualification}
                className={styles.formInput}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email:</label>
              <input
                type="email"
                value={item.email}
                className={styles.formInput}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description:</label>
              <textarea
                value={item.descripition}
                className={styles.formTextarea}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <button
                onClick={(e) => {
                  handleOnClick(e, item.resumeId);
                }}
              >
                Download Resume
              </button>
            </div>
          </form>
        ))
      )}
    </div>
  );
}
