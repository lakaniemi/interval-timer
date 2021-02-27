import { useEffect, useState } from "react";
import { announceTimeLeft } from "../tts";

type Props = {
  durationInSeconds: number;
  onFinish: () => void;
  ttsSeconds?: number[];
};

const Countdown: React.FC<Props> = (props) => {
  const { durationInSeconds, onFinish, ttsSeconds } = props;

  const [timeLeft, setTimeLeft] = useState(durationInSeconds * 1000);
  const [ttsAnnouncements, setTTSAnnouncements] = useState(
    (ttsSeconds || [])
      .filter((x) => x <= durationInSeconds)
      .sort((a, b) => b - a)
  );

  // Create update interval for every 100ms.
  useEffect(() => {
    const endTime = Date.now() + durationInSeconds * 1000;
    const interval = setInterval(() => {
      const newTimeLeft = endTime - Date.now();
      // If less than 50ms to completion, end the countdown.
      if (newTimeLeft <= 50) onFinish();

      setTimeLeft(newTimeLeft);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const timeLeftInSeconds = Math.floor(timeLeft / 1000);

  useEffect(() => {
    if (ttsAnnouncements.length > 0) {
      const [nextAnnouncement, ...rest] = ttsAnnouncements;

      if (timeLeftInSeconds <= nextAnnouncement) {
        setTTSAnnouncements(rest);
        announceTimeLeft(nextAnnouncement);
      }
    }
  }, [timeLeftInSeconds]);

  const minutesLeft = Math.floor(timeLeft / 60000);
  const secondsLeft = Math.floor((timeLeft - minutesLeft * 60000) / 1000);

  return (
    <div className="countdown">
      {minutesLeft}:{`${secondsLeft}`.padStart(2, "0")}
    </div>
  );
};

export default Countdown;
