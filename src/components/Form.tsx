import Button from "./Button";
import FileUpload from "./FileUpload";
import NumberInput from "./NumberInput";
import useSetStartIncrementOnInterval from "../context/FormContext/useSetStartIncrementOnInterval";
import { MAX_DATA_POINTS, MAX_INTERVAL } from "../constant";
import useFieldContextValues from "../context/FormContext/useFieldContextValues";
import useFormValues from "../context/FormContext/useFormValues";
import Row from "./Row";
import "./Form.css";

const Form = () => {
  const { start, size } = useFormValues();
  const setIncrementOnInterval = useSetStartIncrementOnInterval();
  const { incrementOnInterval } = useFieldContextValues();

  return (
    <form id="uplot-chart-form">
      <Row>
        <NumberInput
          name="start"
          id="start-index"
          labelId="start-index-label"
          label="Start index (S)"
          description="Data point index of left edge of the window"
          isValid={(value) => value >= 0 && value < size}
        />

        <NumberInput
          name="size"
          id="size"
          labelId="size-label"
          label="Size of window (N)"
          description="Number of data points to draw"
          isValid={(value) =>
            (value === 2 || value > Math.max(2, start)) &&
            value <= MAX_DATA_POINTS
          }
        />
      </Row>

      <Row>
        <NumberInput
          name="increment"
          id="increment"
          labelId="increment-label"
          label="Increment by (P)"
          description="Size between each data points"
          isValid={(value) => value >= 0 && value <= MAX_DATA_POINTS}
        />

        <NumberInput
          name="interval"
          id="interval"
          labelId="interval-label"
          label="Interval (T) (milliseconds)"
          description="Time interval until start index is incremented"
          isValid={(value) => value >= 16 && value <= MAX_INTERVAL}
        />
      </Row>

      <Row>
        <FileUpload />
      </Row>

      <Row>
        <Button
          type="button"
          text={incrementOnInterval ? "Stop" : "Start"}
          onClick={() => setIncrementOnInterval(!incrementOnInterval)}
        />
      </Row>
    </form>
  );
};

export default Form;
