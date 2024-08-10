type NumberInputProps = {
  name: string;
  id: string;
  defaultValue?: number;
  label: string;
  description: string;
  labelId: string;
  min?: number;
  max?: number;
};

const NumberInput = ({
  name,
  id,
  defaultValue,
  label,
  description,
  labelId,
}: NumberInputProps) => (
  <label>
    <span id={labelId}>{label}</span>
    <span className="description">{description}</span>
    <input
      type="number"
      name={name}
      id={id}
      defaultValue={defaultValue}
      aria-labelledby={labelId}
    />
  </label>
);

export default NumberInput;
