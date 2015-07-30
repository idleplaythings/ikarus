PlayerLeftGameEvent = function PlayerLeftGameEvent (args) {
  GameEvent.call(this, args);
  this.player = this.payload.p;
};

PlayerLeftGameEvent.prototype = Object.create(GameEvent.prototype);

PlayerLeftGameEvent.TYPE = 9;

GameEvent.events.push(PlayerLeftGameEvent);

PlayerLeftGameEvent.create = function (
  gameId, companyId, timeStamp, player, position
) {
  var event = GameEvent.create(
    gameId,
    companyId,
    PlayerLeftGameEvent.TYPE,
    timeStamp, 
    position,
    {
      p: player,
    }
  );
  return new PlayerLeftGameEvent(event);
};