GameEvent = function GameEvent (gameId, companyId, type, timeStamp, position, payload) {
  this.gameId = gameId;
  this.companyId = companyId;
  this.type = type;
  this.timeStamp = timeStamp;
  this.position = position;
  this.payload = payload;
};

GameEvent.prototype.serialize = function () {
  return [
    this.gameId,
    this.companyId,
    this.type,
    this.timeStamp,
    this.position,
    payload
  ];
};

GameEvent.deserialize = function (document) {
  return new GameEvent(
    document[0], document[1], document[2], document[3], document[4], document[5]
  );
};