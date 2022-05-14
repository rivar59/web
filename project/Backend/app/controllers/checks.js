class Check {
  checks = [];
  errors = [];

  constructor(req, res) {
    this.req = req;
    this.res = res;

    return this;
  }

  addCheck(callback, message) {
    this.checks.push({
      callback: callback,
      message: message
    })
    return this;
  }

  verify() {
    this.checks.forEach((check) => {
      const result = check.callback(this.req, this.res);

      if (!result) {
        this.errors.push(check.message)
      }
    });

    return this;
  }
}

module.exports = Check;
