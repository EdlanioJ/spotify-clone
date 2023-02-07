export function millisecondsToDuration(milliseconds: number) {
  let duration = '';
  let seconds = milliseconds / 1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);

  if (hours >= 1) {
    duration += `${hours}h`;
  }

  if (minutes >= 1) {
    duration += ` ${minutes}min`;
  }

  return duration.trim();
}
