import Button from "./Button";
import FileUpload from "./FileUpload";
import NumberInput from "./NumberInput";
import "./Form.css";
import useSetStartIncrementOnInterval from "../context/FormContext/useSetStartIncrementOnInterval";
import useIncrementOnInterval from "../context/FormContext/useIncrementOnInterval";
import { MAX_DATA_POINTS, MAX_INTERVAL } from "../constant";
import useFieldContextValues from "../context/FormContext/useFieldContextValues";

const Form = () => {
  const incrementOnInterval = useIncrementOnInterval();
  const setIncrementOnInterval = useSetStartIncrementOnInterval();
  const { startIndex, size } = useFieldContextValues();

  return (
    <form>
      <div className="row">
        <NumberInput
          name="startIndex"
          id="start-index"
          labelId="start-index-label"
          label="Start index (S)"
          description="Data point index of left edge of the window"
          isValid={(value) =>
            parseFloat(value) >= 0 && parseFloat(value) < size
          }
        />

        <NumberInput
          name="size"
          id="size"
          labelId="size-label"
          label="Size of window (N)"
          description="Number of data points to draw"
          isValid={(value) =>
            (parseFloat(value) === 2 ||
              parseFloat(value) > Math.max(2, startIndex)) &&
            parseFloat(value) <= MAX_DATA_POINTS
          }
        />
      </div>

      <div className="row">
        <NumberInput
          name="increment"
          id="increment"
          labelId="increment-label"
          label="Increment by (P)"
          description="Size between each data points"
          isValid={(value) =>
            parseFloat(value) >= 0 && parseFloat(value) <= MAX_DATA_POINTS
          }
        />

        <NumberInput
          name="interval"
          id="interval"
          labelId="interval-label"
          label="Interval (T) (milliseconds)"
          description="Time interval until start index is incremented"
          isValid={(value) =>
            parseFloat(value) >= 16 && parseFloat(value) <= MAX_INTERVAL
          }
        />
      </div>

      <div className="row">
        <FileUpload />
      </div>

      <div className="row">
        <Button
          text={incrementOnInterval ? "Stop" : "Start"}
          onClick={() => setIncrementOnInterval(!incrementOnInterval)}
        />
      </div>
    </form>
  );
};

export default Form;
