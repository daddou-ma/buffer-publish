const fs = require('fs');
const { join } = require('path');

const sendFavicon = (req, res, type) => {
  const img = fs.readFileSync(join(__dirname, `../favicon/${req.path}`));
  // Cache for 1 year
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());

  if (type === 'ico') {
    res.set('Content-Type', 'image/x-icon');
  } else {
    res.set('Content-Type', 'image/png');
  }
  res.send(img);
  res.end();
};

module.exports.sendFavicon = sendFavicon;
