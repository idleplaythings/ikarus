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
  return get(this.getDoc(), 'name');
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
  return get(this.getDoc(), 'playerIds') || [];
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
    $addToSet: {
      invites: {
        companyId: this._id,
        name: this.getName()
      }
    }
  });
}

Company.prototype.getDoc = function() {
  return collections.CompanyCollection.findOne({ _id: this._id });
}

Company.getById = function(companyId) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ _id: id }));
}

Company.getByName = function(name) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ name: name }));
};

Company.getBySquad = function(squad) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ _id: squad.getCompanyId() }));
};

Company.getByPlayer = function(player) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ playerIds: { $in: player.getSteamId() }}));
};

Company.getAll = function() {
  return collections.CompanyCollection.find({}).fetch().map(Company.fromDoc);
}

Company.create = function() {
  return Company.fromDoc({ _id: collections.CompanyCollection.insert({}) });
}

Company.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Company(doc);
};
