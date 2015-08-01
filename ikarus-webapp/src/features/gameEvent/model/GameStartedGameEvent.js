GameStartedGameEvent = function GameStartedGameEvent (args) {
  GameEvent.call(this, args);
};

GameStartedGameEvent.prototype = Object.create(GameEvent.prototype);

GameStartedGameEvent.TYPE = 1;

GameEvent.events.push(GameStartedGameEvent);

GameStartedGameEvent.create = function (gameId) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    null,
    GameStartedGameEvent.TYPE,
    timeStamp,
    null,
    null
  );
  return new GameStartedGameEvent(event);
};

GameStartedGameEvent.getByGameId = function (gameId) {
  return GameEvent.deserialize(collections.GameEventCollection.findOne(
    {t: GameStartedGameEvent.TYPE, g: gameId}
  ));
};