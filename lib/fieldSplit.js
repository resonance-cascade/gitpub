module.exports = function (req, res, next) {
  splitter(req.body, 'syndication', ',');
  splitter(req.body, 'syndicate-to', ',');
  splitter(req.body, 'category', ',');
  splitter(req.tokenData, 'scope', ' ');
  next();
}

function splitter (obj, field, split) {
  if (obj[field]) obj[field] = obj[field].split(split);
}
