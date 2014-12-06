CompanyRepository = function CompanyRepository(companyCollection, inventoryFactory) {
  this._companyCollection = companyCollection;
  this._inventoryFactory = inventoryFactory;
}

CompanyRepository.prototype.create = function(name) {
  console.log("create");
  this.persist(new Company({ name: name }));
  return this.getByName(name);
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

CompanyRepository.prototype.getByPlayer = function(player) {
  if (!player) {
    return null;
  }

  return this._deserialize(
    this._companyCollection.findOne({
      playerIds: {
        $in: [ player.steamId ]
      }
    })
  );
};

CompanyRepository.prototype._deserialize = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  doc.inventory = this._inventoryFactory.deserialize(doc.inventory);

  return new Company(doc);
};
