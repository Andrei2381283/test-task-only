export const leadingZero = (num: number | string): string => {
  const str = String(num);
  return str.length > 1 ? str : '0' + str;
}