// TO-DO: Add tests for methods
export const sortCards = cards =>
  cards.sort((a, b) => {
    if (a.order > b.order) return 1;
    return -1;
  });

export const getCardsToShow = ({ cards = [], totalCardsToShow }) => {
  const cardList = [];
  const sortedCards = sortCards(cards);
  for (let i = 0, firstEmpty = true; i < totalCardsToShow; i += 1) {
    const card = sortedCards[i];
    if (card) {
      cardList.push(card);
    } else {
      cardList.push({
        order: i,
        empty: firstEmpty,
        progress: null,
      });
      firstEmpty = false;
    }
  }
  return cardList;
};

export const getShortString = string => {
  if (string.length > 20) {
    string = `${string.substring(0, 20)}...`;
  }
  return string;
};
