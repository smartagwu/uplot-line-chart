import { ChangeEvent, useCallback } from "react";
import useDownSampleServiceWorker from "./useDownSampleServiceWorker";

export type CSVData = { [key: string]: string };

type FileInput = HTMLInputElement & { files: [] };

// const getDataPoints = (dataset: number[][]) => {
//   const dataPoints = dataset.reduce<uPlot.AlignedData>(
//     (acc, [xAvg, yAvg]: number[]) => {
//       if (isNaN(xAvg) || isNaN(yAvg)) {
//         return acc;
//       }
//       return [
//         [...acc[0], xAvg],
//         [...acc[1], yAvg],
//       ];
//     },
//     [[], []],
//   );
//   return dataPoints;
// };

const useCSVFileUploader = () => {
  const { processCSVData } = useDownSampleServiceWorker();

  return useCallback(
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
        .then((data) => processCSVData(data))
        .catch((err: unknown) => console.log(err));
    },
    [processCSVData],
  );
};
export default useCSVFileUploader;
