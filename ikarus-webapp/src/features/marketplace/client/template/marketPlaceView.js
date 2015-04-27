Template.marketPlaceView.onCreated(function () {
  this.subscribe('MyCompanyAndSquads');
});

Template.marketPlaceView.events({
  'click .marketEntry': function (event, template) {
    var $elem = jQuery(event.target);
    var armaClass = event.target.attributes.getNamedItem('data-armaclass').value;
    template.data.setSelectedItem(armaClass);
  },

  'click .buymore': function (event, template) {
    template.data.increaseAmountToBuy();
  },

  'click .buyless': function (event, template) {
    template.data.decreaseAmountToBuy();
  },

  'click #buy-button': function (event, template) {
    template.data.buy();
  }
});

Template.marketPlaceView.helpers({
  amountInArmory: function (armaClass) {
    var company = Company.getCurrent();

    if (! company) {
      return 0;
    }

    var armory = Inventory.getByCompany(company);

    if (! armory) {
      return 0;
    }

    return armory.getAmountOfItemsWithClass(armaClass);
  },

  amountToBuy: function () {
    return Template.instance().data.getAmountToBuy();
  },

  getTotalCosts: function () {
    return Template.instance().data.getTotalCosts();
  },

  affordClass: function () {
    if (Template.instance().data.canAfford(Company.getCurrent())) {
      return "btn-success";
    }
    return "btn-danger";
  },

  buyText: function () {
    if (Template.instance().data.canAfford(Company.getCurrent())) {
      return "BUY";
    }

    return "BUY (Can not afford!)";
  }
});