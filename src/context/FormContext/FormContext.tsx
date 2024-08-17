import { createContext, PropsWithChildren, useReducer } from "react";

export type DownSampleDataPoints = (number | number[])[][];
export type DataPoints = number[][];

export type ContextState = {
  formValues: {
    start: number;
    size: number;
    increment: number;
    interval: number;
  };
  dataPoints: DataPoints;
  downSampleDataPoints?: DownSampleDataPoints;
  incrementOnInterval: boolean;
  csvLoadingInProgress: boolean;
};

type ContextAction =
  | {
      type: "setFieldValue";
      payload: {
        key: keyof ContextState["formValues"];
        value: number;
      };
    }
  | {
      type: "setDataPointsValue";
      payload: {
        dataPoints?: DataPoints;
        downSampleDataPoints?: DownSampleDataPoints;
      };
    }
  | { type: "setStartIncrementOnInterval"; payload: { value: boolean } }
  | { type: "setCSVLoadingDone" };

type Dispatch = (action: ContextAction) => void;

const INITIAL_STATE: ContextState = {
  formValues: {
    start: 0,
    size: 10000,
    increment: 10,
    interval: 500,
  },
  incrementOnInterval: false,
  csvLoadingInProgress: false,
  dataPoints: [],
};

const reducer = (state: ContextState, action: ContextAction) => {
  switch (action.type) {
    case "setFieldValue":
      return {
        ...state,
        csvLoadingInProgress: true,
        formValues: {
          ...state.formValues,
          [action.payload.key]: action.payload.value,
        },
      };
    case "setDataPointsValue":
      return {
        ...state,
        csvLoadingInProgress: true,
        dataPoints: action.payload.dataPoints || state.dataPoints,
        downSampleDataPoints:
          action.payload.downSampleDataPoints || state.downSampleDataPoints,
      };
    case "setStartIncrementOnInterval":
      return { ...state, incrementOnInterval: action.payload.value };
    case "setCSVLoadingDone":
      return { ...state, csvLoadingInProgress: false };
    default:
      return state;
  }
};

export const FormContext = createContext<[ContextState, Dispatch]>([
  INITIAL_STATE,
  () => {},
]);

const FormContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <FormContext.Provider value={useReducer(reducer, INITIAL_STATE)}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
