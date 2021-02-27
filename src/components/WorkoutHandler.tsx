import { useState } from "react";

import "./WorkoutHandler.css";

import { WorkoutConfiguration } from "./Configurator";
import Countdown from "./Countdown";

type Props = {
  config: WorkoutConfiguration;
  onFinish: () => void;
};

type WorkoutPhase = "GET-READY" | "EXERCISE" | "REST";

const WorkoutHandler: React.FC<Props> = (props) => {
  const { config, onFinish } = props;

  const [phase, setPhase] = useState<WorkoutPhase>("GET-READY");
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
    <div className={`workout-handler-container phase-${phase.toLowerCase()}`}>
      {phase === "GET-READY" && (
        <>
          <h1>GET READY</h1>
          <Countdown durationInSeconds={10} onFinish={onGetReadyFinished} />
        </>
      )}
      {phase === "EXERCISE" && (
        <>
          <h1>
            EXERCISE {currentRepetition}/{config.numberOfRepetitions}
          </h1>
          <Countdown
            durationInSeconds={config.exerciseInSeconds}
            onFinish={onExerciseFinished}
          />
        </>
      )}
      {phase === "REST" && (
        <>
          <h1>REST</h1>
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
