import { createContext, PropsWithChildren, useReducer } from "react";

export type ContextState = {
  startIndex: number;
  size: number;
  increment: number;
  interval: number;
  dataPoints: number[][];
  downSampleDataPoints?: (number | number[])[][];
  incrementOnInterval: boolean;
  csvLoadingInProgress: boolean;
};

type ContextAction =
  | {
      type: "setFieldValue";
      payload: {
        key: keyof ContextState;
        value: number | string;
      };
    }
  | {
      type: "setDataPointsValue";
      payload: {
        dataPoints?: number[][];
        downSampleDataPoints?: (number | number[])[][];
      };
    }
  | { type: "setStartIncrementOnInterval"; payload: { value: boolean } }
  | { type: "setCSVLoadingDone" };

type Dispatch = (action: ContextAction) => void;

const INITIAL_STATE: ContextState = {
  startIndex: 0,
  size: 10000,
  increment: 10,
  interval: 500,
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
        [action.payload.key]: action.payload.value,
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
