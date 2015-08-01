PlayerDeathGameEvent = function PlayerDeathGameEvent (args) {
  GameEvent.call(this, args);
  this.victim = this.payload.v;
  this.killer = this.payload.k;
  this.weaponArmaClass = this.payload.w;
};

PlayerDeathGameEvent.prototype = Object.create(GameEvent.prototype);

PlayerDeathGameEvent.TYPE = 11;

GameEvent.events.push(PlayerDeathGameEvent);

PlayerDeathGameEvent.create = function (
  gameId, companyId, position, victim, killer, weaponArmaClass
) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    companyId,
    PlayerDeathGameEvent.TYPE,
    timeStamp,
    position,
    {
      v: victim,
      k: killer,
      w: weaponArmaClass
    }
  );
  return new PlayerDeathGameEvent(event);
};

PlayerDeathGameEvent.getByGameIdAndCompanyId = function (gameId, companyId) {
  return collections.GameEventCollection.find(
    {t: PlayerDeathGameEvent.TYPE, g: gameId, c: companyId}
  ).fetch().map(GameEvent.deserialize);
};