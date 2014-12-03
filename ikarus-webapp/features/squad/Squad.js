Squad = (function(){
  'use strict';

  function Squad(args) {
    this._id = args._id;
    this.name = args.name;
    this.members = args.members;
  }

  Squad.prototype.serialize = function(){
    return {
      name: this.name,
      members: this.members.map(function(member){
        return member.steamId
      })
    }
  };

  return Squad;
})();