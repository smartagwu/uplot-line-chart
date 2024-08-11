import { useRef } from "react";
import "./FileUpload.css";
import useCSVFileUploader from "../hooks/useCSVFileUploader";
import useSetFieldValue from "../context/FormContext/useSetFieldValue";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const setFieldValue = useSetFieldValue("dataset");
  const parseCSVFile = useCSVFileUploader(setFieldValue);

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
          name="dataset"
          id="csv-file"
          accept=".csv"
          onChange={parseCSVFile}
        />
        <p>Click to select a CSV file</p>
      </div>
    </div>
  );
};

export default FileUpload;
