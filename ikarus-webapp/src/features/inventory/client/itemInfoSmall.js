Template.itemInfoSmall.helpers({
  name: function () {
    if (this.name) {
      return this.name;
    }

    var item = dic.get('ItemFactory').createItemByArmaClass(this.armaClass);

    return item ? item.name : "";
  }
});