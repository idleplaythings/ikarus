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

Company.prototype.getName = function() {
  return this.getDocument().name;
}

Company.prototype.setName = function(name) {
  collections.CompanyCollection.update(
    {
      _id: this._id
    }, {
      $set: {
        name: name
      }
  });
}


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

Company.prototype.getPlayerIds = function() {
  return this.getDocument().playerIds;
}

Company.prototype.getDocument = function() {
  return collections.CompanyCollection.findOne({ _id: this._id });
}

Company.prototype.playerCount = function() {
  return this.getPlayerIds().length;
};

Company.prototype.getPlayers = function() {
  return Player.getByIds(this.getPlayerIds());
}

Company.prototype.invite = function(player) {
  Meteor.users.update({
    _id: player._id
  }, {
    $push: {
      invites: {
        companyId: this._id,
        name: this.getName()
      }
    }
  });
}

Company.getById = function(companyId) {
  return dic.get('CompanyRepository').getById(companyId);
}

