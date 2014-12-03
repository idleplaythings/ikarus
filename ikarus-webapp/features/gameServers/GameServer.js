GameServer = (function(){
  'use strict';

  function GameServer(args) {
    this._id = args._id;
    this.name = args.name;
    this.status = args.status;
    this.players = args.players;
  }

  GameServer.prototype.getAmountOfPlayers = function(){
    return this.players.length;
  };

  return GameServer;
})();