export const sortMarks = (a: number | undefined, b: number | undefined) => {
  const aVal = a ? a : 0;
  const bVal = b ? b : 0;
  return aVal - bVal;
};

export const sortDate = (a: Date, b: Date) => a.valueOf() - b.valueOf();

export const formatToDatetime = (num: number) => {
  const str = num.toString();
  return str.length === 1 ? `0${str}` : str;
};

export const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = formatToDatetime(date.getMonth());
  const day = formatToDatetime(date.getDate());
  return `${year}-${month}-${day}`;
};

export const getTimeString = (date: Date) => {
  const hours = formatToDatetime(date.getHours());
  const minutes = formatToDatetime(date.getMinutes());
  return `${hours}:${minutes}`;
};
