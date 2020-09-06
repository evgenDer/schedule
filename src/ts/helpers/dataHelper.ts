export const sortMarks = (a: number | undefined, b: number | undefined) => {
  const aVal = a ? a : 0;
  const bVal = b ? b : 0;
  return aVal - bVal;
};

export const sortDate = (a: Date, b: Date) => a.valueOf() - b.valueOf();
