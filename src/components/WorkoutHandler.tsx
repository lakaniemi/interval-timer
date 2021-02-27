import { useState } from "react";

import "./WorkoutHandler.css";

import { WorkoutConfiguration } from "./Configurator";
import Countdown from "./Countdown";

type Props = {
  config: WorkoutConfiguration;
  onFinish: () => void;
};

type WorkoutPhase = "GET-READY" | "EXERCISE" | "REST";

// Generate array values for every minute until 60 minutes. Kinda hardcoded, but
// nobody should do interval training with over 60min intervals :shrug:
const ttsSeconds = [
  1,
  2,
  3,
  4,
  5,
  30,
  ...Array(60)
    .fill(0)
    .map((_, i) => (i + 1) * 60),
];

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
          <Countdown
            durationInSeconds={10}
            onFinish={onGetReadyFinished}
            ttsSeconds={ttsSeconds}
          />
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
            ttsSeconds={ttsSeconds}
          />
        </>
      )}
      {phase === "REST" && (
        <>
          <h1>REST</h1>
          <Countdown
            durationInSeconds={config.restInSeconds}
            onFinish={onRestFinished}
            ttsSeconds={ttsSeconds}
          />
        </>
      )}
    </div>
  );
};

export default WorkoutHandler;
