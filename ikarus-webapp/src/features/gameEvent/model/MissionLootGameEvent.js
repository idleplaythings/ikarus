MissionLootGameEvent = function MissionLootGameEvent (args) {
  GameEvent.call(this, args);
  this.parentItem = this.payload.p;
  this.itemClasses = this.payload.i;
};

MissionLootGameEvent.prototype = Object.create(GameEvent.prototype);

MissionLootGameEvent.TYPE = 100;

GameEvent.events.push(MissionLootGameEvent);

MissionLootGameEvent.create = function (
  gameId, companyId, position, parentItem, itemClasses
) {
  var event = GameEvent.create(
    gameId,
    companyId,
    MissionLootGameEvent.TYPE,
    null, 
    null,
    {
      p: parentItem,
      i: itemClasses
    }
  );
  return new MissionLootGameEvent(event);
};