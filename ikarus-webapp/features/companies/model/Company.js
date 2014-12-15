Company = function Company(args) {
  this._id = args._id || undefined;
  this.name = args.name;
  this.playerIds = args.playerIds || [];
}

Company.prototype.serialize = function() {
  return {
    name: this.name,
    playerIds: this.playerIds
  };
};

Company.prototype.addPlayer = function(player) {
  collections.CompanyCollection.update({
      _id: this._id
    }, {
      $addToSet: {
        playerIds: player.getSteamId()
      }
  });
  player.setCompanyId(this._id);
};

Company.prototype.removePlayer = function(player) {
  collections.CompanyCollection.update(
    {
      _id: this._id
    }, {
      $pull: {
        playerIds: player.getSteamId()
      }
  });
  player.setCompanyId(null);
};

Company.prototype.getName = function() {
  return collections.CompanyCollection.findOne({ _id: this._id }).name;
}

Company.prototype.playerCount = function() {
  if (this.playerIds) {
    return this.playerIds.length;
  }

  return 0;
};

Company.prototype.getPlayers = function() {
  var company = Company.getById(this._id);

  if (!company) {
    return null;
  }

  return dic.get('PlayerRepository').getAllByIds(company.playerIds);
}

Company.getById = function(companyId) {
  return dic.get('CompanyRepository').getById(companyId);
}

