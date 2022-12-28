export const useDateParser = (date: string) => {
  const dateParser = date.split('T')[0]; // format: YYYY-MM-DD
  return { date: dateParser };
};

export const parseDateHour = (toParse: string) => {
  return new Date(toParse).toLocaleString('de-DE');
};

export const parseData = (toParse: string) => {
  return new Date(toParse).toLocaleDateString('pl');
};

export const parseHour = (toParse: string) => {
  return toParse.split('T')[1] && toParse.split('T')[1].slice(0, 8);
};
