LogController = function LogController () {};

LogController.prototype.process = function (log) {
  log.forEach(this.processEntry);
};

LogController.prototype.processEntry = function (entry) {
  switch (entry.type) {
    case 'killed':
      this.processKilled(entry);
      return;
  }
};

LogController.prototype.processKilled = function (killedEntry) {
  var victim = Player.getById(killedEntry.victim);
  var killer = Player.getById(killedEntry.killer);

  if (! victim) {
    return;
  }

  victim.addDeath();

  if (killer) {
    killer.addKill();
  }
};