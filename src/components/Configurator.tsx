import { useState } from "react";
import "./Configurator.css";

export type WorkoutConfiguration = {
  exerciseInSeconds: number;
  restInSeconds: number;
  numberOfRepetitions: number;
};

type Props = {
  onStart: (config: WorkoutConfiguration) => void;
};

const Configurator: React.FC<Props> = (props) => {
  const { onStart } = props;

  const [exerciseInSeconds, setExerciseInSeconds] = useState(60 * 5);
  const [restInSeconds, setRestInSeconds] = useState(60);
  const [numberOfRepetitions, setNumberOfRepetitions] = useState(3);

  const onSubmit = () => {
    onStart({
      exerciseInSeconds,
      restInSeconds,
      numberOfRepetitions,
    });
  };

  return (
    <div className="configurator">
      <div>
        <label>
          Exercise duration
          <input
            type="number"
            value={exerciseInSeconds}
            onChange={(e) => setExerciseInSeconds(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Rest duration
          <input
            type="number"
            value={restInSeconds}
            onChange={(e) => setRestInSeconds(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Number of repetitions
          <input
            type="number"
            value={numberOfRepetitions}
            onChange={(e) => setNumberOfRepetitions(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          Start exercise
        </button>
      </div>
    </div>
  );
};

export default Configurator;
