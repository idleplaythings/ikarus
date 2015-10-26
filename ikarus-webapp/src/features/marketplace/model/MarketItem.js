MarketItem = function MarketItem (id, item, costs, name) {
  this._id = id;
  this._item = item;
  this._costs = costs;
  this._name = name;
};

MarketItem.prototype.getCosts = function () {
  return this._costs;
};

MarketItem.prototype.getName = function () {
  return this._name;
};

MarketItem.prototype.getArmaClass = function () {
  return this._item.armaClass;
};

MarketItem.prototype.getMarketId = function () {
  return this._id;
};

MarketItem.prototype.getItem = function () {
  return this._item;
};

