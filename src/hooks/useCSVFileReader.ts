import { useCallback } from "react";

const useCSVFileReader = () =>
  useCallback((file: File) => {
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

    return csvParser
      .then((data) => data)
      .catch((err: unknown) => console.log(err));
  }, []);

export default useCSVFileReader;
