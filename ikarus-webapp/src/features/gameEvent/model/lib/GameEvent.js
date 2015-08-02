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
};

GameEvent.prototype.serialize = function () {
  return {
      g: this.gameId,
      c: this.companyId,
      t: this.type,
      ts: this.timeStamp,
      p: this.position,
      pl: this.payload
  };
};

GameEvent.deserialize = function (document) {

  if (! document) {
    return null;
  }

  var gameEvent = new GameEvent({
    _id: document._id,
    gameId: document.g,
    companyId: document.c,
    type: document.t,
    timeStamp: document.ts,
    position: document.p,
    payload: document.pl
  });

  var SpecificEventClass = GameEvent.events.filter(function(eventClass){
    return eventClass.TYPE == gameEvent.type;
  }).pop();

  if (! SpecificEventClass) {
    console.log("Did not find specific game event for type", gameEvent.type);
    return gameEvent;
  }

  return new SpecificEventClass(gameEvent);
};

GameEvent.getEventsForGame = function (gameId) {
  return collections.GameEventCollection.find({g: gameId}).fetch().map(GameEvent.deserialize);
};



