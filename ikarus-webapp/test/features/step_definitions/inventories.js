var assert = require('assert');

var inventorysStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^"([^"]*)" has "([^"]*)" "([^"]*)" in armory$/, function (companyName, amount, armaclass, callback) {
    var companyId = getCompanyByByName(this.app, companyName)._id;
    this.app.callTestAddToArmory(companyId, amount, armaclass)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^"([^"]*)" has "([^"]*)" "([^"]*)" in his inventory$/, function (username, amount, armaclass, callback) {
    var steamId = getSteamId(getUser(this.app, username));
    this.app.callTestAddToInventory(steamId, amount, armaclass)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^"([^"]*)" should have "([^"]*)" "([^"]*)" in armory$/, function (companyName, amount, armaclass, callback) {
    assertArmoryContains(this.app, companyName, amount, armaclass);
    callback();
  });

  this.Then(/^"([^"]*)" should have "([^"]*)" "([^"]*)" in his inventory$/, function (username, amount, armaclass, callback) {
    assertInventoryContains(this.app, username, amount, armaclass);
    callback();
  });

  this.When(/^I add "([^"]*)" to my inventory$/, function (armaclass, callback) {
    this.app.callAddToInventory(armaclass)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^I remove "([^"]*)" from my inventory$/, function (armaclass, callback) {
    this.app.callRemoveFromInventory(armaclass)()
      .finally(callback)
      .catch(this.handleError);
  });

};

function assertInventoryContains(app, username, amount, armaclass){
  var steamId = getSteamId(getUser(app, username));
  var inventory = getInventoryBySteamId(app, steamId);

  assertCountIs(inventory, armaclass, amount);
};

function assertArmoryContains(app, companyName, amount, armaclass){
  var companyId = getCompanyByByName(app, companyName)._id;
  var armory = getArmoryByCompanyId(app, companyId);

  assertCountIs(armory, armaclass, amount);
};

function assertCountIs(inventory, armaclass, amount){
  amount = parseInt(amount);
  var count = inventory.items[armaclass] ? inventory.items[armaclass] : 0;
  assert(count === amount);
}

function getCompanyByByName(app, name) {
  return app.findOneFrom('companies', function(company){
    return company.name == name;
  });
}

function getInventoryBySteamId(app, steamId) {
  return app.findOneFrom('inventories', function(inventory){
    return inventory.steamId === steamId;
  });
}

function getArmoryByCompanyId(app, companyId) {
  return app.findOneFrom('inventories', function(inventory){
    return inventory.companyId === companyId;
  });
}

function getUser(app, username) {
  return app.findOneFrom('users', function(user){
    return user.services.steam.username === username;
  });
}

function getSteamId(user) {
  return user.services.steam.id;
}

module.exports = inventorysStepDefinitions;
