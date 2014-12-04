GameServer = (function(){
  'use strict';

  function GameServer(args) {
    this._id = args._id;
    this.name = args.name;
    this.status = args.status;
    this.players = args.players;
  }

  GameServer.prototype.getNumberOfPlayers = function() {
    if (this.players) {
      return this.players.length;
    }

    return 0;
  };

  return GameServer;
})();