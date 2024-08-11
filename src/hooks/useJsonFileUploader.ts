import { ChangeEvent, useCallback } from "react";

type FunnelDataType = object;

export type JsonDataResult = { jsonData: FunnelDataType; fileName: string };

type FileInput = HTMLInputElement & { files: [] };

const useJsonFileUploader = (setJsonData: (data: JsonDataResult) => void) =>
  useCallback(
    (event: ChangeEvent<FileInput>) => {
      const file = event.target.files[0] as File;

      const jsonParser = new Promise<FunnelDataType>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
          try {
            resolve(
              JSON.parse(event.target?.result as string) as FunnelDataType,
            );
          } catch (error) {
            const errorMessage = (error as Error).message;
            const isInvalidJsonFile = errorMessage.match(/is not valid JSON/i);
            if (isInvalidJsonFile) {
              alert(
                `Invalid file selected with type: ${file.type}. Please select a valid JSON file`,
              );
              reject(errorMessage);
            } else throw new Error(errorMessage);
          }
        };
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
      });

      jsonParser
        .then((jsonData: FunnelDataType) =>
          setJsonData({ jsonData, fileName: file.name }),
        )
        .catch((err: unknown) => console.log(err));
    },
    [setJsonData],
  );

export default useJsonFileUploader;
