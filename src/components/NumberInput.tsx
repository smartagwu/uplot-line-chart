import { ChangeEvent, useCallback } from "react";
import useSetFieldValue from "../context/FormContext/useSetFieldValue";
import useFormValues from "../context/FormContext/useFormValues";
import { ContextState } from "../context/FormContext/FormContext";

type NumberInputProps = {
  name: keyof ContextState["formValues"];
  id: string;
  label: string;
  description: string;
  labelId: string;
  isValid?: (value: number) => boolean;
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
  const fieldValue = useFormValues();
  const updateFieldValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (isValid && typeof isValid === "function" && isValid(value)) {
        setFieldValue(value);
      }
    },
    [isValid, setFieldValue],
  );

  return (
    <label>
      <span id={labelId}>{label}</span>
      <span className="description">{description}</span>
      <input
        type="number"
        name={name}
        id={id}
        value={fieldValue[name]}
        onChange={updateFieldValue}
        aria-labelledby={labelId}
      />
    </label>
  );
};

export default NumberInput;
