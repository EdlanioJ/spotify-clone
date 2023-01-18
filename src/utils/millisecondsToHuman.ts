export function millisecondsToHuman(milliseconds: number) {
  let duration = '';
  let seconds = milliseconds / 1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  if (hours < 1) {
    duration += `${minutes} min`;

    if (seconds !== 0) {
      duration += ` ${seconds} s`;
    }

    return duration;
  }

  duration += `aproximadamente ${hours} h`;
  if (minutes !== 0) {
    duration += ` ${minutes} min`;
  }

  return duration;
}
