import { ChangeEvent } from "react";
import useSetFieldValue from "../context/FormContext/useSetFieldValue";
import useFieldContextValue from "../context/FormContext/useFieldContextValue";
import { ContextState } from "../context/FormContext/FormContext";

type NumberInputProps = {
  name: keyof ContextState;
  id: string;
  label: string;
  description: string;
  labelId: string;
  isValid?: (value: string) => boolean;
};

const NumberInput = ({
  name,
  id,
  label,
  description,
  labelId,
  isValid,
}: NumberInputProps) => {
  const setFieldValue = useSetFieldValue(name);
  const fieldValue = useFieldContextValue<number>(name);

  return (
    <label>
      <span id={labelId}>{label}</span>
      <span className="description">{description}</span>
      <input
        type="number"
        name={name}
        id={id}
        value={fieldValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          if (isValid && typeof isValid === "function" && isValid(value)) {
            setFieldValue(value);
          }
        }}
        aria-labelledby={labelId}
      />
    </label>
  );
};

export default NumberInput;
