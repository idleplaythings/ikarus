PlayerLeftGameEvent = function PlayerLeftGameEvent (args) {
  GameEvent.call(this, args);
  this.player = this.payload.p;
};

PlayerLeftGameEvent.prototype = Object.create(GameEvent.prototype);

PlayerLeftGameEvent.TYPE = 9;

GameEvent.events.push(PlayerLeftGameEvent);

PlayerLeftGameEvent.create = function (
  gameId, companyId, player
) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    companyId,
    PlayerLeftGameEvent.TYPE,
    timeStamp,
    null,
    {
      p: player,
    }
  );
  return new PlayerLeftGameEvent(event);
};