exports.ensureFullName = (req, res) => {
  return typeof(req.body.fullName) === 'string'
    && req.body.fullName !== '';
}

exports.ensureEmail = (req, res) => {
  return typeof(req.body.email) === 'string' && Boolean(req.body.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ));
}

exports.ensurePassword = (req, res) => {
  return typeof(req.body.password) === 'string'
    && req.body.password !== '';
}

exports.ensurePasswords = (req, res) => {
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  return typeof(password1) === 'string' && typeof(password2) === 'string'
    && password1 !== ''
    && password1 === password2;
}
