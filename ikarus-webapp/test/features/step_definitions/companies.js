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
    assertMemberOf(this.app._ddpClient.collections, this.username, companyName);
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

  this.Then(/^player "([^"]*)" should have an invitation to "([^"]*)"$/, function (username, companyName, callback) {
    assertHasInviteTo(this.app._ddpClient.collections, username, companyName);
    callback();
  });
};

function assertMemberOf(collections, username, companyName) {
  var steamId = getSteamId(getUser(collections, username));
  var company = getCompanyByMemberSteamId(collections, steamId);

  assert(company);
}

function assertHasInviteTo(collections, username, companyName) {
  var user = getUser(collections, username);
  var invite = getInviteTo(user, companyName);

  assert(invite);
}

function getUser(collections, username) {
  return Object.keys(collections.users).map(function(id) {
    return collections.users[id];
  }).filter(function(user) {
    return user.services.steam.username === username;
  }).reduce(function(_, current) {
    return current;
  });
}

function getSteamId(user) {
  return user.services.steam.id;
}

function getInviteTo(user, companyName) {
  return user.invites.filter(function(invite) {
    return invite.name === companyName;
  }).reduce(function(_, current) {
    return current;
  });
}

function getCompanyByMemberSteamId(collections, steamId) {
  return Object.keys(collections.companies).map(function(id) {
    return collections.companies[id];
  }).filter(function(company) {
    return company.playerIds.indexOf(steamId) > -1;
  }).reduce(function(_, current) {
    return current;
  });
}

module.exports = companiesStepDefinitions;
