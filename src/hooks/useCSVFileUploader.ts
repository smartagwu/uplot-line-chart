import { ChangeEvent, useCallback } from "react";

export type CSVData = { [key: string]: string };

type FileInput = HTMLInputElement & { files: [] };

const useCSVFileUploader = (setFieldValue: (value: string) => void) =>
  useCallback(
    (event: ChangeEvent<FileInput>) => {
      const file = event.target.files[0] as File;
      const csvParser = new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          try {
            resolve(event.target?.result as string);
          } catch (error) {
            reject((error as Error).message);
          }
        };
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
      });

      csvParser
        .then((data) => setFieldValue(data))
        .catch((err: unknown) => console.log(err));
    },
    [setFieldValue],
  );

export default useCSVFileUploader;
