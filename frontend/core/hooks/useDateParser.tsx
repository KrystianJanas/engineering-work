export const useDateParser = (date: string) => {
  const dateParser = date.split('T')[0]; // format: YYYY-MM-DD
  return { date: dateParser };
};

export const parseData = (toParse: string) => {
  let date = new Date(toParse).toLocaleDateString('pl').replaceAll('.', '-');
  if (date.split('-')[0].length === 1) {
    date = `0${date}`;
  }
  return date;
};

export const parseHour = (toParse: string) => {
  return toParse.split('T')[1] && toParse.split('T')[1].slice(0, 5);
};

export const makeFullDataHour = (data: string, text: string) => {
  return `${text} ${parseData(data)}, ${parseHour(data)}`;
};

export const parseDateSettlement = (data: string) => {
  return `MIESIĄC: ${data.split('-')[1]}, ROK: ${data.split('-')[0]}`;
};

export const parseDataUploadFiles = (data: string) => {
  return `${data.split(',')[0].replaceAll('.', '-')}-${data
    .split(',')[1]
    .replaceAll(':', '-')
    .slice(1, data.split(',')[1].length)}`;
};
