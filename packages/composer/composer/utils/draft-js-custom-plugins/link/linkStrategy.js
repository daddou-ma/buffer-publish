import twitterText from 'twitter-text';

const linkStrategy = (contentBlock, callback) => {
  const text = contentBlock.getText();
  const links = twitterText.extractUrlsWithIndices(text);

  links.forEach(link => {
    // The link plugin doesn't use entities: only match links that don't have
    // any entities attached
    const isOtherEntity = contentBlock.getEntityAt(link.indices[0]) !== null;
    if (!isOtherEntity) callback(...link.indices);
  });
};

export default linkStrategy;
