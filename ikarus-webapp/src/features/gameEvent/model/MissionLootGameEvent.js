MissionLootGameEvent = function MissionLootGameEvent (args) {
  GameEvent.call(this, args);
  this.parentItem = this.payload.p || null;
  this.itemClasses = this.payload.i || {};
};

MissionLootGameEvent.prototype = Object.create(GameEvent.prototype);

MissionLootGameEvent.TYPE = 100;

GameEvent.events.push(MissionLootGameEvent);

MissionLootGameEvent.create = function (
  gameId, companyId, parentItem, itemClasses
) {
  var timeStamp = Date.now();
  var event = GameEvent.create(
    gameId,
    companyId,
    MissionLootGameEvent.TYPE,
    timeStamp,
    null,
    {
      p: parentItem,
      i: itemClasses
    }
  );
  return new MissionLootGameEvent(event);
};