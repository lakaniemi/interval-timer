import { useState } from "react";
import { WorkoutConfiguration } from "./Configurator";
import Countdown from "./Countdown";

type Props = {
  config: WorkoutConfiguration;
  onFinish: () => void;
};

type WorkoutPhase = "GET_READY" | "EXERCISE" | "REST";

const WorkoutHandler: React.FC<Props> = (props) => {
  const { config, onFinish } = props;

  const [phase, setPhase] = useState<WorkoutPhase>("GET_READY");
  const [currentRepetition, setCurrentRepetition] = useState(1);

  const onGetReadyFinished = () => {
    setPhase("EXERCISE");
  };

  const onExerciseFinished = () => {
    if (currentRepetition >= config.numberOfRepetitions) {
      onFinish();
      return;
    }
    setCurrentRepetition((value) => value + 1);
    setPhase("REST");
  };

  const onRestFinished = () => {
    setPhase("EXERCISE");
  };

  return (
    <div>
      {phase === "GET_READY" && (
        <Countdown durationInSeconds={10} onFinish={onGetReadyFinished} />
      )}
      {phase === "EXERCISE" && (
        <>
          <div>Exercise</div>
          <Countdown
            durationInSeconds={config.exerciseInSeconds}
            onFinish={onExerciseFinished}
          />
        </>
      )}
      {phase === "REST" && (
        <>
          <div>Rest</div>

          <Countdown
            durationInSeconds={config.restInSeconds}
            onFinish={onRestFinished}
          />
        </>
      )}
    </div>
  );
};

export default WorkoutHandler;
