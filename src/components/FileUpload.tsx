import { useRef } from "react";
import "./FileUpload.css";
import useCSVFileUploader from "../hooks/useCSVFileUploader";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const uploadCSVFile = useCSVFileUploader();

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  return (
    <div className="file-upload">
      <div onClick={triggerFileUpload} className="container">
        <input
          ref={fileInputRef}
          type="file"
          name="csv"
          id="csv-file"
          accept=".csv"
          onChange={uploadCSVFile}
        />
        <p>Click to select a CSV file</p>
      </div>
    </div>
  );
};

export default FileUpload;
