export function formatCurrentDate(value: string) {
  const date = new Date(value);
  const thisYear = new Date().getFullYear();

  if (thisYear === date.getFullYear()) {
    return `${date.getDay()}/${date.getMonth()}`;
  }

  return `${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`;
}
