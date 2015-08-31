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
};

Company.prototype.getRenown = function () {
  var armory = Inventory.getByCompany(this);
   if (! armory) {
    return 0;
  }

  return armory.getAmountOfItemsWithClass('IKRS_renown') || 0;
};

Company.prototype.addRenown = function (amount) {
  var armory = Inventory.getByCompany(this);
  var item = dic.get('ItemFactory').createItemByArmaClass('IKRS_renown');

  Inventory.addToInventory(armory, item, amount);
};

Company.prototype.removeRenown = function (amount) {
  var armory = Inventory.getByCompany(this);
  var item = dic.get('ItemFactory').createItemByArmaClass('IKRS_renown');

  Inventory.removeFromInventory(armory, item, amount);
};

Company.prototype.resetRenown = function () {
  var armory = Inventory.getByCompany(this);
  var item = dic.get('ItemFactory').createItemByArmaClass('IKRS_renown');

  Inventory.removeFromInventory(armory, item, this.getRenown());
};

Company.prototype.getAmountOfMoneyFromSellout = function () {
  var renown = this.getRenown();

  return Math.floor((renown / 500 + 0.5) * renown);
};

Company.prototype.addKill = function() {
  collections.CompanyCollection.update({ _id: this._id }, { $inc: { kills: 1 }});
};

Company.prototype.addDeath = function() {
  collections.CompanyCollection.update({ _id: this._id }, { $inc: { deaths: 1 }});
};

Company.prototype.getKills = function() {
  return get(this.getDoc(), 'kills') || 0;
};

Company.prototype.getDeaths = function() {
  return get(this.getDoc(), 'deaths') || 0;
};

Company.prototype.getKDRatio = function() {
  var deaths = this.getDeaths();
  if (deaths === 0) {
    deaths = 1;
  }

  return this.getKills() / deaths;
};

Company.prototype.getBaseModules = function() {
  var modules = get(this.getDoc(), 'baseModules') || ['Primary1', 'Garage1', 'WeaponCache1', 'ReconStation1'];
  return BaseModule.create(modules);
};

Company.prototype.setBaseModules = function(modules) {
  collections.CompanyCollection.update({
      _id: this._id
    }, {
      $set: {
        baseModules: modules.map(function(module) {
          return module.serialize();
        })
      }
  });
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
};

Company.prototype.removeOutpostAtPosition = function (position) {
  collections.CompanyCollection.update({
    _id: this._id,
    outposts: position
  }, {
    $pull: {
      outposts: position
    }
  });
};

Company.prototype.addOutpostAtPosition = function (position) {
  collections.CompanyCollection.update({
    _id: this._id,
    $or: [{outposts: {$exists: false}}, {$where: 'this.outposts.length < 6'}]
  }, {
    $push: {
      outposts: position
    }
  });
};

Company.prototype.getOutpostLocations = function () {
  return get(this.getDoc(), 'outposts') || [];
};

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

  var baseLocation = {
    x: 12000 + Math.floor(Math.random() * 5000),
    y: 16000 + Math.floor(Math.random() * 4000),
  };

  company.setHideout(baseLocation);
  return company;
}

Company.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Company(doc);
};
