export const useDateParser = (date: string) => {
  const dateParser = date.split('T')[0]; // format: YYYY-MM-DD
  return { date: dateParser };
};
