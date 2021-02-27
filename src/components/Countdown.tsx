import { useEffect, useState } from "react";

type Props = {
  durationInSeconds: number;
  onFinish: () => void;
};

const Countdown: React.FC<Props> = (props) => {
  const { durationInSeconds, onFinish } = props;

  const [timeLeft, setTimeLeft] = useState(durationInSeconds * 1000);

  // Create update interval for every 100ms.
  useEffect(() => {
    const endTime = Date.now() + durationInSeconds * 1000;
    const interval = setInterval(() => {
      const newTimeLeft = endTime - Date.now();

      if (newTimeLeft <= 50) onFinish();

      setTimeLeft(newTimeLeft);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const minutesLeft = Math.floor(timeLeft / 60000);
  const secondsLeft = Math.floor((timeLeft - minutesLeft * 60000) / 1000);

  return (
    <div className="countdown">
      {minutesLeft}:{`${secondsLeft}`.padStart(2, "0")}
    </div>
  );
};

export default Countdown;
