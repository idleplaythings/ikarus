GameEvent = function GameEvent (args) {

  if (! args) {
    args = {};
  }

  this._id = args._id;
  this.gameId = args.gameId;
  this.companyId = args.companyId;
  this.type = args.type;
  this.timeStamp = args.timeStamp;
  this.position = args.position;
  this.payload = args.payload || {};
};

GameEvent.events = [];

GameEvent.create = function(gameId, companyId, type, timeStamp, position, payload) {

  var gameEvent = new GameEvent({
    gameId: gameId,
    companyId: companyId,
    type: type,
    timeStamp: timeStamp,
    position: position,
    payload: payload
  });

  var id = collections.GameEventCollection.insert(
    gameEvent.serialize()
  );

  gameEvent._id = id;

  return gameEvent;
}

gameEvent.Event.prototype.serialize = function () {
  return [
    this.gameId,
    this.companyId,
    this.type,
    this.timeStamp,
    this.position,
    payload
  ];
};

gameEvent.Event.deserialize = function (document) {
  var gameEvent = new GameEvent(
    document[0], document[1], document[2], document[3], document[4], document[5]
  );

  var SpecificEventClass = GameEvent.events.filter(function(eventClass){
    return eventClass.TYPE == gameEvent.type;
  }).pop();

  if (! SpecificEventClass) {
    console.log("Did not find specific game event for type", gameEvent.type);
    return gameEvent;
  }

  return new SpecificEventClass(gameEvent);
};