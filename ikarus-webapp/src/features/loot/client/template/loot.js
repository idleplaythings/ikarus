Template.loot.helpers({
  itemRow: function () {
    if (this instanceof Item) {
      return Spacebars.SafeString(getItemEntry(this));
    }

    return Spacebars.SafeString(this.map(function (item) {
      return getItemEntry(item);
    }).join(", "));
  },

  multipleItems: function () {
    return this.items.length > 1;
  }
});

function getItemEntry(item) {
  return '<span class="itemEntry show-item-tooltip-small" data-armaclass="'+item.armaClass+'">'+item.name+'</span>';
}