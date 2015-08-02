PlayerJoinedGameEvent = function PlayerJoinedGameEvent (args) {
  GameEvent.call(this, args);
  this.player = this.payload.p;
};

PlayerJoinedGameEvent.prototype = Object.create(GameEvent.prototype);

PlayerJoinedGameEvent.TYPE = 10;

GameEvent.events.push(PlayerJoinedGameEvent);

PlayerJoinedGameEvent.create = function (
  gameId, companyId, player
) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    companyId,
    PlayerJoinedGameEvent.TYPE,
    timeStamp,
    null,
    {
      p: player,
    }
  );
  return new PlayerJoinedGameEvent(event);
};

PlayerJoinedGameEvent.getByGameIdAndCompanyId = function (gameId, companyId) {
  return collections.GameEventCollection.find(
    {t: PlayerJoinedGameEvent.TYPE, g: gameId, c: companyId}
  ).fetch().map(GameEvent.deserialize);
};