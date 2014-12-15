LootController = function LootController(
  squadRepository,
  companyRepository,
  itemFactory,
  inventoryRepository,
  dice
){
  this._squadRepository = squadRepository;
  this._companyRepository = companyRepository;
  this._itemFactory = itemFactory;
  this._inventoryRepository = inventoryRepository;
  this._dice = dice;
}

LootController.prototype.receiveLoot = function(squadId, loot) {
  var squad = this._getSquad(squadId);
  var company = this._getCompany(squad);

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

LootController.prototype._getCompany = function(squad) {
  return this._companyRepository.getBySquad(squad) || this._notFound('Company');
};

LootController.prototype._getSquad = function(id) {
  return this._squadRepository.getById(id) || this._notFound('Squad');
};

LootController.prototype._notFound = function(what) {
  console.log(what + "not found (LootController)");
  console.trace();
  throw new Meteor.Error(404, what + ' not found');
};
