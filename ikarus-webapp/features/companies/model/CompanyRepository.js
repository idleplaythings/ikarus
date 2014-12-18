CompanyRepository = function CompanyRepository(companyCollection, inventoryRepository) {
  this._companyCollection = companyCollection;
  this._inventoryRepository = inventoryRepository;
}

CompanyRepository.prototype.create = function(name) {
  console.log("create");
  this.persist(new Company({
    name: name,
  }));
  var company = this.getByName(name);
  this._inventoryRepository.createCompanyInventory(company);
  return company;
};


CompanyRepository.prototype.persist = function(company) {
  this._companyCollection.update(
    { name: company.name },
    company.serialize(),
    { upsert: true }
  );
};

CompanyRepository.prototype.getById = function(id) {
  return this._deserialize(this._companyCollection.findOne({ _id: id }));
};

CompanyRepository.prototype.getByName = function(name) {
  return this._deserialize(this._companyCollection.findOne({ name: name }));
};

CompanyRepository.prototype.getBySquad = function(squad) {
  return this._deserialize(this._companyCollection.findOne({ _id: squad.getCompanyId() }));
};

CompanyRepository.prototype.getByPlayer = function(player) {
  if (!player) {
    return null;
  }

  return this._deserialize(
    this._companyCollection.findOne({
      playerIds: {
        $in: [ player.getSteamId() ]
      }
    })
  );
};

CompanyRepository.prototype.getAll = function() {
  return this._companyCollection.find().fetch().map(this._deserialize);
}

CompanyRepository.prototype._deserialize = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new Company(doc);
};
