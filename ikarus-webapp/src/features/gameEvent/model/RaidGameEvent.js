RaidGameEvent = function RaidGameEvent (args) {
  GameEvent.call(this, args);
  this.winnerCompanyId = this.payload.w;
  this.loserCompanyId = this.payload.l;
  this.renown = this.payload.r;
};

RaidGameEvent.prototype = Object.create(GameEvent.prototype);

RaidGameEvent.TYPE = 200;

GameEvent.events.push(RaidGameEvent);

RaidGameEvent.create = function (
  gameId, companyId, winnerId, loserId, renown
) {

  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    companyId,
    RaidGameEvent.TYPE,
    timeStamp,
    null,
    {
      w: winnerId,
      l: loserId,
      r: renown
    }
  );
  return new RaidGameEvent(event);
};

RaidGameEvent.getByGameIdAndCompanyId = function (gameId, companyId) {
  return collections.GameEventCollection.find(
    {t: RaidGameEvent.TYPE, g: gameId, c: companyId}
  ).fetch().map(GameEvent.deserialize);
};