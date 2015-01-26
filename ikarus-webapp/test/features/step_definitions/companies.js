var assert = require('assert');

var companiesStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^company "([^"]*)" exists$/, function (name, callback) {
    var self = this;
    this.app.createCompany(name)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^I create a company called "([^"]*)"$/, function (name, callback) {
    this.app.callCreateCompany(name)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^I should be a member of the company "([^"]*)"$/, function (companyName, callback) {
    assertMemberOf(this.app, this.username, companyName);
    callback();
  });

  this.Given(/^I am a member of company "([^"]*)"$/, function (companyName, callback) {
    this.app.addPlayerToCompany(this.username, companyName)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^I invite "([^"]*)" to my company$/, function (name, callback) {
    this.app.callInviteToCompany(name)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^"([^"]*)" is a member of company "([^"]*)"$/, function (username, companyName, callback) {
    this.app.addPlayerToCompany(username, companyName)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^player "([^"]*)" should have an invitation to "([^"]*)"$/, function (username, companyName, callback) {
    assertHasInviteTo(this.app, username, companyName);
    callback();
  });

  this.Then(/^company "([^"]*)" should have an inventory$/, function (companyName, callback) {
    assertHasInventory(this.app, companyName)
    callback();
  });
};

function assertMemberOf(app, username, companyName) {
  var steamId = getSteamId(getUser(app, username));
  var company = getCompanyByMemberSteamId(app, steamId);

  assert(company);
}

function assertHasInventory(app, companyName) {
  var company = getCompanyByByName(app, companyName);
  var inventory = getInventoryByCompanyId(app, company._id);

  assert(inventory);
}

function assertHasInviteTo(app, username, companyName) {
  var user = getUser(app, username);
  var invite = getInviteTo(user, companyName);

  assert(invite);
}

function getUser(app, username) {
  return app.findOneFrom('users', function(user){
    return user.services.steam && user.services.steam.username === username;
  });
}

function getSteamId(user) {
  return user.services.steam.id;
}

function getInviteTo(user, companyName) {
  return user.invites.filter(function(invite) {
    return invite.name === companyName;
  }).pop();
}

function getCompanyByMemberSteamId(app, steamId) {
  return app.findOneFrom('companies', function(company){
    return company.playerIds && company.playerIds.indexOf(steamId) > -1;
  });
}

function getCompanyByByName(app, name) {
  return app.findOneFrom('companies', function(company){
    return company.name == name;
  });
}

function getInventoryByCompanyId(app, companyId) {
  return app.findOneFrom('inventories', function(inventory){
    return inventory.companyId == companyId;
  });
}

module.exports = companiesStepDefinitions;
