export default function arrayIsEmpty(arr: []) {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.length === 0;
}
