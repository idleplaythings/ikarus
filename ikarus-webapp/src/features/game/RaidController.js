
RaidController = function RaidController(){}

RaidController.prototype.receiveRaidResults = function(server, raids) {

  raids.forEach(function(raid) {
    var raider = Squad.getById(raid.raiderId);
    var defender = Squad.getById(raid.defenderId);
    var amountHeld = raid.amountHeld;

    if (amountHeld == 100) {
      this.rewardRaid(server, raider, defender, true);
    } else {
      this.rewardRaid(server, defender, raider, false);
    }

  }, this);

};

RaidController.prototype.rewardRaid = function (server, winnerSquad, loserSquad) {

  if (! winnerSquad || ! loserSquad) {
    console.log("RAID CONTROLLER squad not found", winnerSquad, loserSquad);
    return;
  }

  var winnerCompany = winnerSquad.getCompany();
  var loserCompany = loserSquad.getCompany();

  if (! winnerCompany || ! loserCompany) {
    console.log("RAID CONTROLLER company not found", winnerCompany, loserCompany);
    return;
  }

  var winnerRenown = Math.floor(loserCompany.getRenown() * 0.25);

  loserCompany.removeRenown(winnerRenown);
  winnerCompany.addRenown(winnerRenown);
  RaidGameEvent.create(server.getGameId(), winnerCompany._id, winnerCompany._id, loserCompany._id, winnerRenown);
  RaidGameEvent.create(server.getGameId(), loserCompany._id, winnerCompany._id, loserCompany._id, winnerRenown);

  MissionLootGameEvent.create(
    server.getGameId(),
    winnerCompany._id,
    null,
    {"IKRS_renown": winnerRenown}
  );

  MissionLootGameEvent.create(
    server.getGameId(),
    loserCompany._id,
    null,
    {"IKRS_renown": winnerRenown * -1}
  );
};
