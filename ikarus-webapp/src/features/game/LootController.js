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
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_old_RU_weapons',
    'IKRS_loot_smg_weapons',
    'IKRS_loot_old_nato_weapons',
    'C_Offroad_01_F',
    'C_Offroad_01_F',
  ];

  this.receiveLootForCompany(company, loot, new ObjectiveSupply());
};

LootController.prototype.receiveLoot = function(squadId, loot, objectiveName) {
  var squad = this._getSquad(squadId);
  var company = this._getCompany(squad);
  var objective = new namespace["Objective" + objectiveName];
  var modules = squad.getBaseModules();

  this.receiveLootForCompany(company, loot, objective, modules);
};

LootController.prototype.receiveLootForCompany = function(company, loot, objective, modules) {
  if (! modules) {
    modules = [];
  }
  modules.forEach(function(module){
    loot = module.removeLoot(loot);
  });

  var items = this._itemFactory.createItems(loot);
  var companyInventory = Inventory.getByCompany(company);

  items.forEach(function(item){
    if (item.isLoot() && objective.allowLoot()){
      this._handleLootBackpack(companyInventory, item);
    } else {
      this._handleLoot(companyInventory, item);
    }
  }, this);

  this._itemFactory.createItems(objective.getAdditionalLoot(loot)).forEach(function(item){
    if (item.isLoot()){
      this._handleLootBackpack(companyInventory, item);
    } else {
      this._handleLoot(companyInventory, item);
    }
  }, this);
};

LootController.prototype._handleLoot = function(companyInventory, item){
  Inventory.addToInventory(companyInventory, item);
};

LootController.prototype._handleLootBackpack = function(
  companyInventory, lootBackpack
){
  var loot = lootBackpack.randomizeLoot(this._dice);
  Object.keys(loot).forEach(function(key){
    var armaClass = key;
    var amount = loot[key];

    while(amount > 0){
      Inventory.addToInventory(
        companyInventory,
        this._itemFactory.createItemByArmaClass(armaClass)
      );
      amount--;
    }
  }, this);
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
