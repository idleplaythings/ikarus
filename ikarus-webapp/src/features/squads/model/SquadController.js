SquadController = function SquadController(serverQueueService) {
  this._serverQueueService = serverQueueService;
}

SquadController.prototype.createNewSquad = function(player, company){
  var player = this._getPlayer();
  var company = this._getCompany();
  this._checkNoSquad();

  var squad = this._initSquad(company);
  squad.addPlayer(player);
  squad.addPlayerGear(player);
};

SquadController.prototype.joinSquad = function(squadId){
  var player = this._getPlayer();
  this._checkNoSquad();

  var squad = this._getSquadById(squadId);

  this._serverQueueService.joinSquad(squad, player);

};

SquadController.prototype.leaveSquad = function(){
  var player = this._getPlayer();
  var squad = this._getSquad();

  this._serverQueueService.leaveSquad(squad, player);
};

SquadController.prototype.enterSquadQueue = function(){
  var squad = this._getSquad();
  this._serverQueueService.enterQueue(squad);
};

SquadController.prototype.leaveSquadQueue = function(){
  var squad = this._getSquad();

  if (! squad.isLocked()) {
    this._serverQueueService.leaveQueue(squad);
  }

};

SquadController.prototype._initSquad = function(company) {
  var squad = Squad.create();
  squad.setCompanyId(company._id);
  squad.setStartingLocation(company);
  Inventory.createForSquad(squad);
  return squad;
};

SquadController.prototype._checkNoSquad = function () {
  return Squad.getCurrent() && this._alreadyExists('Squad');
};

SquadController.prototype._getPlayer = function () {
  return Player.getCurrent() || this._notFound('Player');
};

SquadController.prototype._getSquad = function () {
  return Squad.getCurrent() || this._notFound('Squad');
};

SquadController.prototype._getSquadById = function (id) {
  return Squad.getById(id) || this._notFound('Squad');
};

SquadController.prototype._getCompany = function () {
  return Company.getCurrent() || this._notFound('Company');
};

SquadController.prototype._notFound = function (what) {
  throw new Meteor.Error(404, what + ' not found');
};

SquadController.prototype._alreadyExists = function (what) {
  throw new Meteor.Error(400, what + ' already exists');
};
