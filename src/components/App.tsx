import { useState } from "react";
import "./App.css";
import Configurator, { WorkoutConfiguration } from "./Configurator";
import WorkoutCompleted from "./WorkoutCompleted";
import WorkoutHandler from "./WorkoutHandler";

type AppState =
  | { status: "CONFIG" }
  | { status: "RUNNING"; config: WorkoutConfiguration }
  | { status: "FINISHED" };

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ status: "CONFIG" });

  const onConfigurationFinished = (config: WorkoutConfiguration) => {
    setAppState({ status: "RUNNING", config });
  };

  const onWorkoutFinish = () => {
    setAppState({ status: "FINISHED" });
  };

  return (
    <div className="app-container">
      {appState.status === "CONFIG" && (
        <Configurator onStart={onConfigurationFinished} />
      )}
      {appState.status === "RUNNING" && (
        <WorkoutHandler config={appState.config} onFinish={onWorkoutFinish} />
      )}
      {appState.status === "FINISHED" && <WorkoutCompleted />}
    </div>
  );
};

export default App;
