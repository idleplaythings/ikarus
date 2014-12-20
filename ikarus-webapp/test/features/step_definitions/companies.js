var assert = require('assert');

var DEFAULT_PASSWORD = 'salakala';
var username = null;

var companiesStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^player "([^"]*)" with Steam ID "([^"]*)" exists$/, function (name, steamId, callback) {
    this.app.createUser(name, steamId, DEFAULT_PASSWORD)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^I am logged in as "([^"]*)"$/, function (name, callback) {
    username = name;
    this.app.login(name, DEFAULT_PASSWORD)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^I create a company called "([^"]*)"$/, function (name, callback) {
    this.app.createCompany(name)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^I should be a member of the company "([^"]*)"$/, function (companyName, callback) {
    assertMemberOf(this.app._ddpClient.collections, username, companyName);
    callback();
  });
};

function assertMemberOf(collections, username, companyName) {
  var steamId = getSteamId(collections, username);
  var company = getCompanyByMemberSteamId(collections, steamId);

  assert(company);
}

function getSteamId(collections, username) {
  var user = Object.keys(collections.users).map(function(id) {
    return collections.users[id];
  }).filter(function(user) {
    return user.username === username;
  }).reduce(function(_, current) {
    return current;
  });

  return user.services.steam.id;
}

function getCompanyByMemberSteamId(collections, steamId) {
  var company = Object.keys(collections.companies).map(function(id) {
    return collections.companies[id];
  }).filter(function(company) {
    return company.playerIds.indexOf(steamId) > -1;
  }).reduce(function(_, current) {
    return current;
  });

  return company;
}

module.exports = companiesStepDefinitions;
