GameEndGameEvent = function GameEndGameEvent (args) {
  GameEvent.call(this, args);
};

GameEndGameEvent.prototype = Object.create(GameEvent.prototype);

GameEndGameEvent.TYPE = 3;

GameEvent.events.push(GameEndGameEvent);

GameEndGameEvent.create = function (gameId) {
  var timeStamp = Date.now();
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

GameEndGameEvent.getByGameId = function (gameId) {
  return GameEvent.deserialize(collections.GameEventCollection.findOne(
    {t: GameEndGameEvent.TYPE, g: gameId}
  ));
};

GameEndGameEvent.getLatest = function (limit) {
  if (! limit) {
    limit = 5;
  }

  return collections.GameEventCollection.find(
    {t: GameEndGameEvent.TYPE}, {limit: limit}
  ).fetch().map(GameEvent.deserialize);
};
