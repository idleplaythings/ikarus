PlayerDeathGameEvent = function PlayerDeathGameEvent (
  gameId,
  timeStamp,
  victim,
  killer,
  weaponArmaClass
  ) {
  this.gameId = gameId;
  this.type = PlayerDeathGameEvent.TYPE;
  this.timeStamp = timeStamp;
  this.victim = victim;
  this.killer = killer;
  this.weaponArmaClass = weaponArmaClass;
};

PlayerDeathGameEvent.TYPE = 1;

PlayerDeathGameEvent.prototype.serialize = function () {
  return {
    v: this.victim,
    k: this.killer,
    w: this.weaponArmaClass
  }
};

PlayerDeathGameEvent.deserialize = function (gameEvent) {
  return new PlayerDeathGameEvent()
};