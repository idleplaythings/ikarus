GameWaitingGameEvent = function GameWaitingGameEvent (args) {
  GameEvent.call(this, args);
};

GameWaitingGameEvent.prototype = Object.create(GameEvent.prototype);

GameWaitingGameEvent.TYPE = 2;

GameEvent.events.push(GameWaitingGameEvent);

GameWaitingGameEvent.create = function (gameId) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    null,
    GameWaitingGameEvent.TYPE,
    timeStamp,
    null,
    null
  );
  return new GameWaitingGameEvent(event);
};

GameWaitingGameEvent.getByGameId = function (gameId) {
  return GameEvent.deserialize(collections.GameEventCollection.findOne(
    {t: GameWaitingGameEvent.TYPE, g: gameId}
  ));
};