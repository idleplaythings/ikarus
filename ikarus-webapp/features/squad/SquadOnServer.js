SquadOnServer = (function(){
  'use strict';

  function SquadOnServer(args) {
    this._id = args._id;
    this.serverId = args.serverId;
    this.membersOnServer = args.membersOnServer || [];
    this.missionItems = new SquadMissionItems(args.missionItems);
    this.startingLocation = args.startingLocation || {x: 10000, y:10000};
    this.objectives = args.objectives;
    this.squadId = args.squadId;
    this.locked = args.locked || false;
  }

  SquadOnServer.prototype.addPlayer = function(player){
    if (this.membersOnServer.indexOf(player.steamId) !== -1)
      return;

    this.membersOnServer.push(player.steamId);
  };

  SquadOnServer.prototype.removePlayer = function(player){
    this.membersOnServer = this.membersOnServer.filter(function(steamId){
      return steamId !== player.steamId;
    });
  };

  SquadOnServer.prototype.isEmpty = function(){
    return this.membersOnServer.length === 0;
  };

  SquadOnServer.prototype.serialize = function(){
    return {
      serverId: this.serverId,
      membersOnServer: this.membersOnServer,
      missionItems: this.missionItems.serialize(),
      startingLocation: this.startingLocation,
      objectives: this.objectives,
      squadId: this.squadId,
      locked: this.locked
    };
  };

  return SquadOnServer;
})();