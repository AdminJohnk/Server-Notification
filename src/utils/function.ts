export const getSelectData = (select: string[] = []) => {
  return Object.fromEntries(select.map(item => [item, 1]));
};
