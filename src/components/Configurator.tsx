import "./Configurator.css";

const Configurator: React.FC = () => {
  return (
    <div className="configurator">
      <div>
        <label>
          Round duration
          <input type="number" />
        </label>
      </div>
      <div>
        <label>
          Break duration
          <input type="number" />
        </label>
      </div>
      <div>
        <label>
          Number of rounds
          <input type="number" />
        </label>
      </div>
    </div>
  );
};

export default Configurator;
