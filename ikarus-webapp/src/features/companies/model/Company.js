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
};

Company.prototype.isEmpty = function() {
  return this.getPlayerIds().length === 0;
};

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

Company.prototype.remove = function() {
  return collections.CompanyCollection.remove({
    _id: this._id
  });
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
  player.addInvite({
    companyId: this._id,
    name: this.getName()
  });
}

Company.prototype.getDoc = function() {
  return collections.CompanyCollection.findOne({ _id: this._id });
}

Company.prototype.getHideout = function() {
  return get(this.getDoc(), 'hideout') || { x: 10000, y: 10000 };
}

Company.prototype.setHideout = function(hideout) {
  collections.CompanyCollection.update({
    _id: this._id
  }, {
    $set: {
      hideout: hideout
    }
  });
}

Company.getById = function(companyId) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ _id: companyId }));
}

Company.getByName = function(name) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ name: name }));
};

Company.getBySquad = function(squad) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ _id: squad.getCompanyId() }));
};

Company.getByPlayer = function(player) {
  return Company.fromDoc(collections.CompanyCollection.findOne({ playerIds: { $in: [ player.getSteamId() ] }}));
};

Company.getCurrent = function() {
  var player = Player.getCurrent();

  if (player) {
    return player.getCompany();
  }

  return null;
}

Company.getAll = function() {
  return collections.CompanyCollection.find({}).fetch().map(Company.fromDoc);
}

Company.create = function(name) {
  var company = Company.fromDoc({ _id: collections.CompanyCollection.insert({ name: name}) });
  Inventory.createForCompany(company);
  return company;
}

Company.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Company(doc);
};
