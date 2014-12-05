CompanyRepository = function CompanyRepository(companyCollection) {
  this._companyCollection = companyCollection;
}

CompanyRepository.prototype.create = function(name) {
  this.persist(new Company({ name: name }));
  return this.getByName(name);
};


CompanyRepository.prototype.persist = function(company) {
  this._companyCollection.update(
    { name: company.getName() },
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

CompanyRepository.prototype.getByMember = function(player) {
  return this._fromDoc(
    this._companyCollection.findOne({
      members: {
        $in: [ player.getSteamId() ]
      }
    })
  );
};

CompanyRepository.prototype._serialize = function(company) {
  return {
    name: company.getName(),
    members: company.getMembers().map(this._mapToSteamId)
  };
};

CompanyRepository.prototype._mapToSteamId = function(player) {
  return player.steamId;
};

CompanyRepository.prototype._fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Company(doc);
};
