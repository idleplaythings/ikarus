
OutpostController = function OutpostController(){}

OutpostController.prototype.outpostChanges = function(squadId, changes) {
  var squad = this._getSquad(squadId);
  var company = this._getCompany(squad);

  changes.removedOutposts.forEach(function (position) {
    company.removeOutpostAtPosition(position);
  });

  changes.newOutposts.forEach(function (position) {
    company.addOutpostAtPosition(position);
  });

};


OutpostController.prototype._getSquad = function(squadId) {
  return Squad.getById(squadId) || this._notFound('Squad', squadId);
};

OutpostController.prototype._getCompany = function(squad) {
  return squad.getCompany() || this._notFound('Company', squad);
};

OutpostController.prototype._notFound = function(what, needle) {
  console.log(what + "not found (OutpostController)", needle);
  console.trace();
  throw new Meteor.Error(404, what + ' not found');
};
