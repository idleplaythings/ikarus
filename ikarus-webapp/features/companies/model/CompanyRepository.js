CompanyRepository = function CompanyRepository(companyCollection) {
  this._companyCollection = companyCollection;
}

CompanyRepository.prototype.create = function(name) {
  this.persist(new Company({ name: name }));
  return this.getByName(name);
};


CompanyRepository.prototype.persist = function(company) {
  this._companyCollection.update(
    { name: company.name },
    this._serialize(company),
    { upsert: true }
  );
};

CompanyRepository.prototype.getById = function(id) {
  return this._fromDoc(this._companyCollection.findOne({ _id: id }));
};

CompanyRepository.prototype.getByName = function(name) {
  return this._fromDoc(this._companyCollection.findOne({ name: name }));
};

CompanyRepository.prototype.getByPlayer = function(player) {
  if (!player) {
    return null;
  }

  return this._fromDoc(
    this._companyCollection.findOne({
      playerIds: {
        $in: [ player.steamId ]
      }
    })
  );
};

CompanyRepository.prototype._serialize = function(company) {
  return {
    name: company.name,
    playerIds: company.playerIds
  };
};

CompanyRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Company(doc);
};
