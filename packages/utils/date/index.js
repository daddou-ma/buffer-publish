// eslint-disable-next-line import/prefer-default-export
export const getTime = date => {
  const day = date || new Date();
  return Math.ceil(day / 1000);
};
