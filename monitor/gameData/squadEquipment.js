
module.exports = SquadEquipment;

function SquadEquipment(weapons, magazines, items, backpacks) {
  this._weapons = weapons;
  this._magazines = magazines;
  this._items = items;
  this._backpacks = backpacks;
}

SquadEquipment.prototype.serializeForArma = function(){
  return [this._weapons, this._magazines, this._items, this._backpacks];
};
