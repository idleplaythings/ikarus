var hooks = function () {
  this.Before(function(callback) {
    var connect = this.app.connect();
    connect()
      .finally(callback)
      .catch(this.handleError);
  });

  this.After(function(callback) {
    var logout = this.app.logout();
    var removeFixtures = this.app.removeFixtures();
    var disconnect = this.app.disconnect();

    logout()
      .then(removeFixtures)
      .then(disconnect)
      .finally(callback)
      .catch(this.handleError);
  });
};

module.exports = hooks;