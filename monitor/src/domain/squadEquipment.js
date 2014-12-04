
module.exports = SquadEquipment;

function SquadEquipment(args) {
  this.weapons = args.weapons || [];
  this.magazines = args.magazines || [];
  this.items = args.items || [];
  this.backpacks = args.backpacks || [];
}

SquadEquipment.prototype.serializeForArma = function(){
  return [this.weapons, this.magazines, this.items, this.backpacks];
};
