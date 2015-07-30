PlayerJoinedGameEvent = function PlayerJoinedGameEvent (args) {
  GameEvent.call(this, args);
  this.player = this.payload.p;
};

PlayerJoinedGameEvent.prototype = Object.create(GameEvent.prototype);

PlayerJoinedGameEvent.TYPE = 10;

GameEvent.events.push(PlayerJoinedGameEvent);

PlayerJoinedGameEvent.create = function (
  gameId, companyId, timeStamp, player
) {
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