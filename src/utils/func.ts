export const isEmptyArray = (arr: []) => {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.length === 0;
};
