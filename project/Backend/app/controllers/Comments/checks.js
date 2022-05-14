exports.ensureTitle = (req, res) => {
  return typeof(req.body.title) === 'string'
    && req.body.title !== '';
}

exports.ensureDescription = (req, res) => {
  return typeof(req.body.description) === 'string'
    && req.body.description !== '';
}
