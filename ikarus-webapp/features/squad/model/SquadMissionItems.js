SquadMissionItems = function SquadMissionItems(args) {
  if (!args) {
    args = {};
  }

  this.weapons = args.weapons || [];
  this.magazines = args.magazines || [];
  this.items = args.items || [];
  this.backpacks = args.backpacks || [];
}

SquadMissionItems.prototype.serialize = function(){
  return {
    weapons: this.weapons,
    magazines: this.magazines,
    items: this.items,
    backpacks: this.backpacks
  }
};
