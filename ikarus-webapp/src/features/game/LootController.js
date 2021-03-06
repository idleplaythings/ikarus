var namespace = this;

LootController = function LootController(
  itemFactory,
  dice
){
  this._itemFactory = itemFactory;
  this._dice = dice;
}

LootController.prototype.addStartingLoot = function(company) {
  var loot = [
    'IKRS_STARTING_LOOT'
  ];

  this.receiveLootForCompany(null, company, loot, new Objective());
};

LootController.prototype.receiveLoot = function(squadId, loot, objectiveName) {
  var squad = this._getSquad(squadId);
  var server = squad ? Server.getByInGameSquad(squad) : null;
  var company = this._getCompany(squad);
  var objective = new Objective();

  this.receiveLootForCompany(server, company, loot, objective);
};

LootController.prototype.receiveLootForCompany = function(server, company, loot, objective) {

  var items = this._itemFactory.createItems(loot);
  var companyInventory = Inventory.getByCompany(company);
  var addedItems = {};

  items.forEach(function(item){
    if (item.isLoot()){
      if (objective.allowLoot()) {
        this._handleLootBackpack(companyInventory, item, server);
      }
    } else {
      this._handleLoot(companyInventory, item);
      this._addToItemObject(addedItems, item);
    }
  }, this);

  this._itemFactory.createItems(objective.getAdditionalLoot(loot)).forEach(function(item){
    if (item.isLoot()){
      this._handleLootBackpack(companyInventory, item, server);
    } else {
      this._handleLoot(companyInventory, item);
      this._addToItemObject(addedItems, item);
    }
  }, this);

  if (server) {
    MissionLootGameEvent.create(
      server.getGameId(),
      companyInventory.companyId,
      null,
      addedItems
    );
  }
};

LootController.prototype._addToItemObject = function (obj, item) {
  if (! obj[item.armaClass]) {
    obj[item.armaClass] = 1;
  } else {
    obj[item.armaClass]++;
  }
};

LootController.prototype._handleLoot = function(companyInventory, item){
  Inventory.addToInventory(companyInventory, item);
};

LootController.prototype._handleLootBackpack = function(
  companyInventory, lootBackpack, server
){
  var addedItems = {};
  var loot = lootBackpack.randomizeLoot(this._dice);
  Object.keys(loot).forEach(function(key){
    var armaClass = key;
    var amount = loot[key];

    while(amount > 0){
      var item = this._itemFactory.createItemByArmaClass(armaClass);
      this._addToItemObject(addedItems, item);
      Inventory.addToInventory(
        companyInventory,
        item
      );
      amount--;
    }
  }, this);
  if (server) {
    MissionLootGameEvent.create(
      server.getGameId(),
      companyInventory.companyId,
      lootBackpack.armaClass,
      addedItems
    );
  }
};

LootController.prototype._getSquad = function(squadId) {
  return Squad.getById(squadId) || this._notFound('Squad');
};

LootController.prototype._getCompany = function(squad) {
  return squad.getCompany() || this._notFound('Company');
};

LootController.prototype._notFound = function(what) {
  console.log(what + "not found (LootController)");
  console.trace();
  throw new Meteor.Error(404, what + ' not found');
};
