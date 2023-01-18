export const formatDuration = (seconds: number) => {
  return new Date(seconds).toISOString().substring(15, 15 + 4);
};
