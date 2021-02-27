const formulateSentence = (timeLeftInSeconds: number): string => {
  // For values under 10, just say the number
  if (timeLeftInSeconds <= 10) {
    return timeLeftInSeconds.toString();
  }

  if (timeLeftInSeconds < 60) {
    return `${timeLeftInSeconds} seconds left`;
  }

  const fullMinutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;

  if (seconds > 0) {
    return `${fullMinutes} ${
      fullMinutes > 1 ? "minutes" : "minute"
    } and ${seconds} ${seconds > 1 ? "seconds" : "second"} left`;
  }

  return `${fullMinutes} ${fullMinutes > 1 ? "minutes" : "minute"} left`;
};

export const announceTimeLeft = (timeLeftInSeconds: number): void => {
  const message = new SpeechSynthesisUtterance(
    formulateSentence(timeLeftInSeconds)
  );
  window.speechSynthesis.speak(message);
};
