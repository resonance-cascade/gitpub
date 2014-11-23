module.exports = function (req, res, next) {
  splitter(req.body, 'syndication');
  splitter(req.body, 'syndicate-to');
  next();
}

function splitter (obj, field) {
  if (obj[field]) obj[field] = obj[field].split(',');
}
