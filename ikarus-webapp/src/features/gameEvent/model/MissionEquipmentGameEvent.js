MissionEquipmentGameEvent = function MissionEquipmentGameEvent (args) {
  GameEvent.call(this, args);
  this.itemClasses = this.payload.i || {};
};

MissionEquipmentGameEvent.prototype = Object.create(GameEvent.prototype);

MissionEquipmentGameEvent.TYPE = 101;

GameEvent.events.push(MissionEquipmentGameEvent);

MissionEquipmentGameEvent.create = function (
  gameId, companyId, itemClasses
) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    companyId,
    MissionEquipmentGameEvent.TYPE,
    timeStamp,
    null,
    {
      i: itemClasses
    }
  );
  return new MissionEquipmentGameEvent(event);
};

MissionEquipmentGameEvent.getByGameIdAndCompanyId = function (gameId, companyId) {
  return collections.GameEventCollection.find(
    {t: MissionEquipmentGameEvent.TYPE, g: gameId, c: companyId}
  ).fetch().map(GameEvent.deserialize);
};