import "./App.css";
import Configurator from "./Configurator";
import Countdown from "./Countdown";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Configurator />
      <Countdown durationInSeconds={125} onFinish={() => alert("Finished")} />
    </div>
  );
};

export default App;
