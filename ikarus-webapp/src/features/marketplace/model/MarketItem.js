MarketItem = function MarketItem (item, costs) {
  this._item = item;
  this._costs = costs;
};

MarketItem.prototype.getCosts = function () {
  return this._costs;
};

MarketItem.prototype.getName = function () {
  return this._item.name;
};

MarketItem.prototype.getArmaClass = function () {
  return this._item.armaClass;
};

MarketItem.prototype.getItem = function () {
  return this._item;
};

