LootController = function LootController(
  itemFactory,
  inventoryRepository,
  dice
){
  this._itemFactory = itemFactory;
  this._inventoryRepository = inventoryRepository;
  this._dice = dice;
}

LootController.prototype.addStartingLoot = function(company) {
  var loot = [
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_civilian_weapons',
    'IKRS_loot_old_RU_weapons',
    'IKRS_loot_old_RU_weapons',
    'IKRS_loot_common_RU_weapons',
    'IKRS_loot_heavy_RU_weapons'
  ];

  this.receiveLootForCompany(company, loot);
};

LootController.prototype.receiveLoot = function(squadId, loot) {
  var squad = this._getSquad(squadId);
  var company = this._getCompany(squad);

  this.receiveLootForCompany(company, loot);
};

LootController.prototype.receiveLootForCompany = function(company, loot) {
  var items = this._itemFactory.createItems(loot);
  var companyInventory = this._inventoryRepository.getByCompany(company);

  items.forEach(function(item){
    if (item.isLoot()){
      this._handleLootBackpack(companyInventory, item);
    } else {
      this._handleLoot(companyInventory, item);
    }
  }, this);
};

LootController.prototype._handleLoot = function(companyInventory, item){
  this._inventoryRepository.addToInventory(companyInventory, item);
};

LootController.prototype._handleLootBackpack = function(
  companyInventory, lootBackpack
){
  var loot = lootBackpack.randomizeLoot(this._dice);
  Object.keys(loot).forEach(function(key){
    var armaClass = key;
    var amount = loot[key];

    while(amount > 0){
      this._inventoryRepository.addToInventory(
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
