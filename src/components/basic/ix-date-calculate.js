export const tableCodeGegerate = () => {
  const date = new Date();
  const primaryCode =
    date.getDay() +
    date.getFullYear() +
    date.getMonth() +
    date.getMinutes() +
    date.getHours() +
    date.getSeconds() +
    11;

  const tableCode = '00' + primaryCode + '11';

  return tableCode;
};
