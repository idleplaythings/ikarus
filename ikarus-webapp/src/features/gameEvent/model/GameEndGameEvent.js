GameEndGameEvent = function GameEndGameEvent (args) {
  GameEvent.call(this, args);
};

GameEndGameEvent.prototype = Object.create(GameEvent.prototype);

GameEndGameEvent.TYPE = 3;

GameEvent.events.push(GameEndGameEvent);

GameEndGameEvent.create = function (gameId, timeStamp) {
  var event = GameEvent.create(
    gameId,
    null,
    GameEndGameEvent.TYPE,
    timeStamp, 
    null,
    null
  );
  return new GameEndGameEvent(event);
};