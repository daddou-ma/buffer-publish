/* Abbreviates numbers, eg: if we want 2 decimal places, it displays 1240 as 1.24k */

module.exports = (number, decPlaces) => {
  decPlaces = 10 ** decPlaces;
  const abbreviations = ['k', 'm', 'b', 't'];

  for (let i = abbreviations.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      if (number == 1000 && i < abbreviations.length - 1) {
        number = 1;
        i++;
      }
      number += abbreviations[i];
      break;
    }
  }
  return number;
};
