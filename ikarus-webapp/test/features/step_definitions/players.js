var assert = require('assert');

var playersStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^player "([^"]*)" with Steam ID "([^"]*)" exists$/, function (name, steamId, callback) {
    this.app.createUser(name, steamId, this.defaultPassword)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^I am logged in as "([^"]*)"$/, function (name, callback) {
    this.username = name;
    this.app.login(name, this.defaultPassword)()
      .finally(callback)
      .catch(this.handleError);
  });
};

module.exports = playersStepDefinitions;
