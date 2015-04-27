MarketContext = function MarketContext (category, itemFactory, amount, armaClass) {
  this._category = category;
  this._itemFactory = itemFactory;
  this._items = this.createItems();
  this._selectedItem = this.getItemByClass(armaClass) || null;
  this._amountToBuy = amount || 1;

  this._itemDependency = new Tracker.Dependency();
  this._quantityDependency = new Tracker.Dependency();
}

MarketContext.prototype.getItemByClass = function (armaClass) {
  return this._items.filter(function (marketItem) {
    return marketItem.getItem().armaClass == armaClass;
  }).pop();
};

MarketContext.prototype.createItems = function () {
  var items = marketDefinitions.filter(function(def) {
    return def._id == this._category;
  }.bind(this)).pop().items;

  return Object.keys(items).map(function (armaClass) {

    var costs = Object.keys(items[armaClass]).map(function (resource) {
      return {
        item: this._itemFactory.createItemByArmaClass(resource),
        amount: items[armaClass][resource]
      };
    }.bind(this));

    return new MarketItem(
      this._itemFactory.createItemByArmaClass(armaClass),
      costs
    );
  }.bind(this));
};

MarketContext.prototype.getItems = function () {
  return this._items;
};

MarketContext.prototype.getSelectedItem = function () {
  this._itemDependency.depend();

  if (! this._selectedItem) {
    return this._items[0];
  }

  return this._selectedItem;
};

MarketContext.prototype.setSelectedItem = function (armaClass) {
  this._selectedItem = this._items.filter(function (item) {
    return item.getArmaClass() == armaClass;
  }).pop();

  this._amountToBuy = 1;
  this._itemDependency.changed();
};

MarketContext.prototype.canAfford = function (company) {

    if (! company) {
      return false;
    }

    var armory = Inventory.getByCompany(company);

    if (! armory) {
      return false;
    }

    var costs = this.getTotalCosts();

    return costs.every(function (cost){
      return armory.getAmountOfItemsWithClass(cost.item.armaClass) >= cost.amount;
    });
};

MarketContext.prototype.getTotalCosts = function () {
  return this.getSelectedItem().getCosts().map(function (cost) {
    return {
      item: cost.item,
      amount: cost.amount * this.getAmountToBuy()
    };
  }.bind(this));
};

MarketContext.prototype.getAmountToBuy = function () {
  this._quantityDependency.depend();
  return this._amountToBuy;
};

MarketContext.prototype.increaseAmountToBuy = function () {
  this._quantityDependency.changed();
  this._amountToBuy++;
};

MarketContext.prototype.decreaseAmountToBuy = function () {
  if (this._amountToBuy === 1) {
    return;
  }

  this._quantityDependency.changed();
  this._amountToBuy--;
};

MarketContext.prototype.buy = function () {
  Meteor.call(
    'buyFromMarket',
    this._category,
    this.getSelectedItem().getItem().armaClass,
    this.getAmountToBuy()
  );

  this._amountToBuy = 1;
};
