import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import "./FileUpload.css";
import useCSVFileReader from "../hooks/useCSVFileReader";
import useDownSampleServiceWorker from "../hooks/useDownSampleServiceWorker";

type FileInput = HTMLInputElement & { files: [] };

const FileUpload = () => {
  const [csv, setCSVData] = useState<string>();
  const fileInputRef = useRef(null);
  const uploadCSVFile = useCSVFileReader();
  const { processCSVData } = useDownSampleServiceWorker();
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  const processFile = useCallback(
    (event: ChangeEvent<FileInput>) => {
      uploadCSVFile(event.target.files[0]).then((data) => {
        if (data) {
          setCSVData(data);
        }
      });
    },
    [uploadCSVFile],
  );

  useEffect(() => {
    if (csv && csv.length > 0) {
      processCSVData(csv);
    }
  }, [csv, processCSVData]);

  return (
    <div className="file-upload">
      <div className="container" onClick={triggerFileUpload}>
        <input
          ref={fileInputRef}
          type="file"
          name="csv"
          id="csv-file"
          accept=".csv"
          onChange={processFile}
        />
        <p>Click to select a CSV file</p>
      </div>
    </div>
  );
};

export default FileUpload;
