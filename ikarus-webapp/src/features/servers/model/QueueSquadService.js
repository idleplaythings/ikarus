QueueSquadService = function () {
  this._squadJoins = [];
  this._squadLeaves = [];
  this._queueJoins = [];
  this._queueLeaves = [];
}

function containsPlayer(queue, player) {
  return queue.some(function(queue) {
    return queue.player._id === player._id;
  })
};

function containsSquad(queue, squad) {
  return queue.some(function(queueSquad) {
    return queueSquad._id === squad._id;
  })
};

QueueSquadService.prototype.joinQueue = function(squad) {
  if (containsSquad(this._queueJoins, squad)) {
    return;
  }

  if (!squad.allPlayersAreReady()) {
    return;
  }

  this._queueJoins.push(squad);
};

QueueSquadService.prototype.leaveQueue = function(squad) {
  if (containsSquad(this._queueLeaves, squad)) {
    return;
  }
  this._queueLeaves.push(squad);
};

QueueSquadService.prototype.joinSquad = function(squad, player) {
  if (containsPlayer(this._squadJoins, player)) {
    return;
  }
  this._squadJoins.push({squad: squad, player:player});
};

QueueSquadService.prototype.leaveSquad = function(squad, player) {
  if (containsPlayer(this._squadLeaves, player)) {
    return;
  }
  this._squadLeaves.push({squad: squad, player:player});
};

QueueSquadService.prototype.evaluateSquads = function() {

  var squadJoin = this._squadJoins.shift();
  while(squadJoin) {
    this.addPlayerToSquad(squadJoin.squad, squadJoin.player);
    squadJoin = this._squadJoins.shift();
  }

  var squadLeave = this._squadLeaves.shift();
  while(squadLeave) {
    this.removePlayerFromSquad(squadLeave.squad, squadLeave.player);
    squadLeave = this._squadLeaves.shift();
  }

  var queueJoin = this._queueJoins.shift();
  while(queueJoin) {
    this.addSquadToQueue(queueJoin);
    queueJoin = this._queueJoins.shift();
  }

  var queueLeave = this._queueLeaves.shift();
  while(queueLeave) {
    this.removeSquadFromQueue(queueLeave);
    queueLeave = this._queueLeaves.shift();
  }

  Squad.getAll().forEach(this.evaluateSquad.bind(this));
};

QueueSquadService.prototype.addPlayerToSquad = function(squad, player) {
  if (
    !player ||
    !squad ||
    !player.canJoinASquad() ||
    !squad.exists() ||
    (! squad.isJoinable() && ! squad.isReinforceable(player))
  ) {
    return;
  }

  squad.addPlayer(player);
  squad.addPlayerGear(player);
};

QueueSquadService.prototype.removePlayerFromSquad = function(squad, player) {
  squad.removePlayer(player);
  squad.removePlayerGear(player);
};

QueueSquadService.prototype.addSquadToQueue = function(squad) {
  if (ServerQueue.getBySquad(squad) || squad.getServer() || ! squad.exists()) {
    return;
  }

  var queue = ServerQueue.getByRegion('EU');
  queue.addToQueue(squad);
};

QueueSquadService.prototype.removeSquadFromQueue = function(squad) {
  var queue = ServerQueue.getByRegion('EU');
  queue.removeSquadFromQueue(squad);
};

QueueSquadService.prototype.evaluateSquad = function(squad) {
  try {

    var server = squad.getServer();
    var queue = ServerQueue.getByRegion('EU');
    var company = Company.getBySquad(squad);

    if (! company && (! server || ! server.isPlaying())) {
      Inventory.removeBySquad(squad);
      queue.removeSquadFromQueue(squad);

      if (server) {
        server.removeSquadFromGame(squad);
      }

      squad.remove();
      return;
    }

    checkSquadDeadline(squad, server);

    //Empty squad, not locked = free to do anything and get inventory back
    if (squad.isEmpty() && ! squad.isLocked()){
      Inventory.returnItems(company, squad);
      Inventory.removeBySquad(squad);
      queue.removeSquadFromQueue(squad);
      squad.remove();
    }

    //Empty squad, in server, but server not playing yet. Free to leave, DO NOT LOSE INVENTORY
    if (squad.isEmpty() && server && ! server.isPlaying()) {
      Inventory.returnItems(company, squad);
      Inventory.removeBySquad(squad);
      queue.removeSquadFromQueue(squad);
      server.removeSquadFromGame(squad);
      squad.remove();
    }

  } catch (e) {
    console.log(e, e.stack);
  }
}

function checkSquadDeadline (squad, server) {
  if (server && ! squad.isBeforeDeadline()) {
    var steamIdsOnSquad = squad.getSteamIds();
    var steamIdsOnServer = server.getPlayerIds();
    if (steamIdsOnServer.length === 0) {
      steamIdsOnSquad.forEach(function(steamId) {
        squad.removePlayer(Player.getById(steamId));
      });
    }
  }
}