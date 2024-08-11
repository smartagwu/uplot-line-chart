import { createContext, PropsWithChildren, useReducer } from "react";

export type ContextState = {
  startIndex: number;
  size: number;
  increment: number;
  interval: number;
  dataset?: string;
};

type ContextAction = {
  type: "setFieldValue";
  payload: {
    key: keyof ContextState;
    value: number | string;
  };
};

type Dispatch = (action: ContextAction) => void;

const INITIAL_STATE: ContextState = {
  startIndex: 0,
  size: 100,
  increment: 10,
  interval: 500,
};

const reducer = (state: ContextState, action: ContextAction) => {
  switch (action.type) {
    case "setFieldValue":
      return { ...state, [action.payload.key]: action.payload.value };
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
