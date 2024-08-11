import Button from "./Button";
import FileUpload from "./FileUpload";
import NumberInput from "./NumberInput";
import "./Form.css";

const Form = () => {
  return (
    <form>
      <div className="row">
        <NumberInput
          name="startIndex"
          id="start-index"
          labelId="start-index-label"
          label="Start index (S)"
          description="Data point index of left edge of the window"
          isValid={(value) => parseInt(value) >= 0}
        />

        <NumberInput
          name="size"
          id="size"
          labelId="size-label"
          label="Size of window (N)"
          description="Number of data points to draw"
          isValid={(value) => parseInt(value) >= 2}
        />
      </div>

      <div className="row">
        <NumberInput
          name="increment"
          id="increment"
          min={0}
          labelId="increment-label"
          label="Increment by (P)"
          description="Size between each data points"
          isValid={(value) => parseInt(value) >= 0}
        />

        <NumberInput
          name="interval"
          id="interval"
          min={16}
          labelId="interval-label"
          label="Interval (T) (milliseconds)"
          description="Time interval until start index is incremented"
          isValid={(value) => parseInt(value) >= 16}
        />
      </div>

      <div className="row">
        <FileUpload />
      </div>

      <div className="row">
        <Button text="Start" />
      </div>
    </form>
  );
};

export default Form;
