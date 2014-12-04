SquadMissionItems = (function(){
  'use strict';

  function SquadMissionItems(){
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

  return SquadMissionItems;
})();

