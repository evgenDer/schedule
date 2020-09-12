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

export const getDateString = (datetime: string) => {
  return datetime.split('T')[0];
};

export const getTimeString = (datetime: string) => {
  return datetime.split('T')[1].slice(0, 5);
};
