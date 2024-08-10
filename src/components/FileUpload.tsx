import { useCallback, useRef } from "react";
import "./FileUpload.css";
import useJsonFileUploader from "../hooks/useJsonFileUploader";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const setJsonData = useCallback(() => {}, []);
  const parseJsonFile = useJsonFileUploader(setJsonData);

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
          onChange={parseJsonFile}
        />
        <p>Click to select a CSV file</p>
      </div>
    </div>
  );
};

export default FileUpload;
